import "./RecipeDetail.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipeSummary } from "../utils/fetchRecipeSummary";
import Nav from "../small components/Nav";
import Ingredient from "../small components/Ingredient";
import { Box, CircularProgress } from "@mui/material";

const RecipeDetail = () => {
  const { id } = useParams();
  type KeyValueObj = {
    [index: string]: string;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: [id],
    queryFn: () => fetchRecipeSummary({ id }),
  });

  const [currentIngsView, setCurrentIngsView] = useState("grid");
  const [currentIngsValues, setCurrentIngsValues] = useState("metric");

  useEffect(() => {
    setTimeout(() => {
      if (data)
        document!.querySelector(".desc1")!.innerHTML = data?.[0]?.summary;
    }, 200);
    //because returned data is in html format
  }, [data]);

  return (
    <>
      {data?.[0].code === 402 ? (
        <p>Your daily limit has been exhausted. Payment required</p>
      ) : isPending ? (
        <Box className="loading-container-center" textAlign="center">
          <CircularProgress />{" "}
        </Box>
      ) : isError ? (
        <p>Your daily limit has been exhausted. Payment required</p>
      ) : (
        <>
          <Nav />
          <div className="recipe-detail">
            <h1 className="recipe-title">{data?.[0]?.title}</h1>
            <section className="hero-section">
              <div className="row flex"></div>
            </section>
            <section className="description">
              <div className="desc1"></div>
            </section>

            <section className="ingredients">
              <div className="ingredients-listing">
                <h2>Ingredients</h2>
                <div className="listing-type">
                  <div className="tabs flex">
                    <div
                      className={`grid ${
                        currentIngsView === "grid" ? "active-tab" : false
                      }`}
                      onClick={() => {
                        setCurrentIngsView("grid");
                      }}
                    >
                      grid
                    </div>
                    <div
                      className={`list ${
                        currentIngsView === "list" ? "active-tab" : false
                      }`}
                      onClick={() => {
                        setCurrentIngsView("list");
                      }}
                    >
                      list
                    </div>
                    <p>serving input</p>
                  </div>
                  <div className="quantity-type tabs flex">
                    <div
                      className={`metric ${
                        currentIngsValues === "metric" ? "active-tab" : false
                      }`}
                      onClick={() => {
                        setCurrentIngsValues("metric");
                      }}
                    >
                      metric
                    </div>
                    <div
                      className={`us ${
                        currentIngsValues === "us" ? "active-tab" : false
                      }`}
                      onClick={() => {
                        setCurrentIngsValues("us");
                      }}
                    >
                      US
                    </div>
                  </div>
                </div>

                <div className="listing-data">
                  {currentIngsView === "grid" && (
                    <div className="listing-data-grid">
                      {data?.[1]?.ingredients?.map((d) => {
                        return (
                          <Ingredient
                            key={d.name}
                            data={d}
                            values={currentIngsValues}
                          />
                        );
                      })}
                    </div>
                  )}

                  {currentIngsView === "list" && (
                    <div className="listing-data-list">
                      {data?.[1]?.ingredients?.map((d) => {
                        return (
                          <>
                            <Ingredient
                              key={d.name}
                              data={d}
                              values={currentIngsValues}
                            />
                            <hr />
                          </>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default RecipeDetail;
