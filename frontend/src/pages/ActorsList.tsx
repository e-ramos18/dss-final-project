import {
  Autocomplete,
  Backdrop,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchActors } from "../misc/actor";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { IActor } from "../types";
import { useNavigate } from "react-router-dom";

const ActorsList = () => {
  const actors = useAppSelector((state) => state.actor.actors);
  const loading = useAppSelector((state) => state.actor.loading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [filteredActors, setFilteredActors] = useState<IActor[] | null>(null);
  useEffect(() => {
    onMount();
  }, [actors.length]);
  const onMount = async () => {
    const res = await dispatch(fetchActors());
    if (res.type === "actor/fetchActors/rejected") {
      //@ts-ignore
      setErrorMessage(res.error.message);
    }
    setFilteredActors(actors);
  };
  const resetTable = () => {
    setFilteredActors(actors);
  };

  const handleSearchChange = (_event: object, value: string) => {
    const filtered = actors.filter(
      (actor) =>
        actor.fname.includes(value) ||
        actor.lname.includes(value) ||
        actor.gender.includes(value)
    );
    setFilteredActors(filtered);
  };

  return (
    <>
      <Typography variant="h6">Actors</Typography>
      <div className="ma-sm">
        <Autocomplete
          freeSolo
          disableClearable
          options={actors.map((option) => option.fname)}
          onChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search Actor"
              InputProps={{
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Reset">
                      <IconButton onClick={() => resetTable()}>
                        <RestartAltIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          )}
        />
      </div>

      {filteredActors && filteredActors.length > 0 ? (
        <div className="actorsList">
          {filteredActors.map((actor) => (
            <div
              className="actor"
              key={actor.id}
              onClick={() => navigate(`/actor/${actor.id}`)}
            >
              <Typography variant="h6">
                {actor.fname} {actor.lname}
              </Typography>
              <img src={actor.imageUrl} alt={actor.fname} />
            </div>
          ))}
        </div>
      ) : (
        <h2 className="center">No Actors.</h2>
      )}

      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ActorsList;
