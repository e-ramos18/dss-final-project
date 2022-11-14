import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { fetchActors, searchActors } from "../misc/actor";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { throwError } from "../utils";
import { ErrorContext, ErrorContextType } from "../context/ErrorProvider";
import { setFilteredActors } from "../features/actor/actorSlice";
import SearchInput from "../components/SearchInput";

const ActorsList = () => {
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const { actors, filteredActors } = useAppSelector((state) => state.actor);
  const loading = useAppSelector((state) => state.actor.loading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    onMount();
  }, [actors.length]);
  const onMount = async () => {
    try {
      const res = await dispatch(fetchActors());
      throwError(res.payload);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const resetTable = () => {
    dispatch(setFilteredActors(actors));
  };

  const handleSearchChange = (key: string) => {
    setSearchValue(key);
  };

  const onSearch = async () => {
    try {
      const res = await dispatch(searchActors(searchValue));
      throwError(res.payload);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Typography variant="h6">Actors</Typography>
      <div className="ma-sm">
        <SearchInput
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={onSearch}
          reset={resetTable}
        />
      </div>
      {filteredActors?.length > 0 && (
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
      )}
      {!loading && filteredActors.length <= 0 && (
        <h2 className="center">No Actors.</h2>
      )}
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ActorsList;
