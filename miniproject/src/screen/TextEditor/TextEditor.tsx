import { Download } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Quill from "quill";
import { Delta, EmitterSource } from "quill/core";
import "quill/dist/quill.snow.css";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { API_SOCKET_URL } from "../../constants";
import { userData } from "../../utils/user";
import "./styles.css";

const TOOL_BAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const TextEditor = () => {
  const [socket, setSocket] = useState<Socket>();

  const { id: documentId } = useParams();
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);

  const [quill, setQuill] = useState<Quill>();

  // this prevents the quil reach textbox to render multiple times
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapperRef = useCallback((wrapper: any) => {
    if (wrapper === null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOL_BAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading please wait ...");
    setQuill(q);
  }, []);

  useEffect(() => {
    if (!socket || !quill) return;

    socket.once(
      "loadDocument",
      (document: { delta: Delta; connectedUsers: string[] }) => {
        quill.setContents(document.delta);
        setConnectedUsers(document.connectedUsers);
        quill.enable();
      }
    );

    socket.emit("getDocument", {
      documentId,
      username: userData.getUsername(),
    });
  }, [socket, quill, documentId]);

  useEffect(() => {
    const handler = (delta: Delta, oldDelta: Delta, source: EmitterSource) => {
      if (source !== "user") return;
      if (socket) {
        socket.emit("updateDocument", { delta, documentId }); // you need to replace the doc id here
      }
    };
    quill?.on("text-change", handler);

    return () => {
      quill?.off("text-change", handler);
    };
  }, [socket, quill, documentId]);

  useEffect(() => {
    const handler = (delta: Delta) => {
      if (quill) {
        quill.updateContents(delta);
      }
    };
    socket?.on("receivedChanges", handler);

    return () => {
      socket?.off("receivedChanges", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    const s = io(`${API_SOCKET_URL}`, {
      query: {
        name: userData.getUsername(),
        documentId: documentId,
      },
    });

    setSocket(s);

    s.on("onlineUsers", (data) => {
      setConnectedUsers(data);
    });

    return () => {
      s.emit("onLeaveDocument", {
        documentId,
        username: userData.getUsername(),
      });
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      socket?.emit("saveDocument", { documentId, delta: quill?.getContents() });
    }, 3000);

    return () => clearInterval(interval);
  }, [socket, quill, documentId]);
  return (
    <>
      <div className="avtiveUsers">
        <center>
          <Button
            variant="contained"
            style={{ borderRadius: "50%" }}
            onClick={() => window.print()}
          >
            <Download />
          </Button>
          <Typography variant="h5">Active Users</Typography>
          {connectedUsers.map((user) => (
            <ActiveUserBadge username={user} />
          ))}
        </center>
      </div>
      <div ref={wrapperRef} id="textEditorContainer"></div>
    </>
  );
};

const colors = ["#0099ff", "#00cc00", "#ff5500", "#ff0000", "#990099"];

const ActiveUserBadge: React.FC<{ username: string }> = ({ username }) => {
  return (
    <div
      className="badge"
      title={username}
      style={{
        backgroundColor: colors[Math.floor(Math.random() * colors.length - 1)],
      }}
    >
      <p>{username.slice(0, 3)}</p>
    </div>
  );
};

export default TextEditor;
