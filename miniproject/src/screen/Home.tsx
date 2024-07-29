import React, { useEffect, useState } from "react";
import AppDataTable from "../components/Datatable/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Button,
  CircularProgress,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import dayjs from "dayjs";
import MenuIcon from "@mui/icons-material/Menu";
import {
  deleteDocumentRequest,
  Document,
  fetchDocumentsRequest,
} from "../store/documents/document.slice";
import CollectNameModal from "../components/CollectNameModal";
import CreateDocumentModal from "../components/CreateDocumentModal";
import UpdateDocumentNameModal from "../components/UpdateDocumenttNameModal";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../routes";
import { userData } from "../utils/user";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, documents } = useSelector(
    (state: RootState) => state.document
  );

  const [isNameModalOpened, setIsNameModalOpened] = useState(false);
  const [isUpdateNameModalOpened, setIsUpdateNameModalOpened] = useState(false);
  const [isNewDocModalOpened, setIsNewDocModalOpened] = useState(false);
  const [toUpdateDocument, setToUpdateDocument] = useState<Document>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.getUsername()) {
      setIsNameModalOpened(true);
    }
    dispatch(fetchDocumentsRequest());
  }, []);

  if (loading) return <CircularProgress size={58} />;

  if (error)
    return (
      <center>
        <span>{error}</span>
      </center>
    );

  const handleDelete = (id: number) => {
    dispatch(deleteDocumentRequest(id));
  };

  return (
    <div>
      {isNameModalOpened && (
        <CollectNameModal
          handleClose={() => setIsNameModalOpened(false)}
          open={isNameModalOpened}
        />
      )}
      {isNewDocModalOpened && (
        <CreateDocumentModal
          handleClose={() => setIsNewDocModalOpened(false)}
          open={isNewDocModalOpened}
        />
      )}
      {isUpdateNameModalOpened && toUpdateDocument && (
        <UpdateDocumentNameModal
          document={toUpdateDocument}
          handleClose={() => setIsUpdateNameModalOpened(false)}
          open={isUpdateNameModalOpened}
        />
      )}
      <Button onClick={() => setIsNewDocModalOpened(true)}>
        Create a document
      </Button>
      <AppDataTable
        columns={[
          "Document Id",
          "Document name",
          "Created on",
          "Updated On",
          "Actions",
        ]}
        rows={documents?.map((document) => ({
          id: document.id,
          name: document.name,
          createdOn: dayjs(document.createdOn).format("DD MMMM MM, YYYY HH:MM"),
          updatedOn: dayjs(document.updatedOn).format("DD MMMM MM, YYYY HH:MM"),
          actions: (
            <DocumentItemActions
              onDelete={() => handleDelete(document.id)}
              onEdit={() => {
                navigate(appRoutes.document.replace(":id", `${document.id}`));
              }}
              onTitleUpdate={() => {
                setToUpdateDocument(document);
                setIsUpdateNameModalOpened(true);
              }}
            />
          ),
        }))}
      />
    </div>
  );
};

const DocumentItemActions: React.FC<{
  onEdit: () => void;
  onDelete: () => void;
  onTitleUpdate: () => void;
}> = ({ onEdit: onUpdate, onDelete, onTitleUpdate }) => {
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
      >
        <MenuIcon />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={() => {}}
              >
                <MenuItem
                  onClick={() => {
                    setOpen(false);
                    onUpdate();
                  }}
                >
                  Start Editing
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setOpen(false);
                    onTitleUpdate();
                  }}
                >
                  Update Title
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setOpen(false);
                    onDelete();
                  }}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default Home;
