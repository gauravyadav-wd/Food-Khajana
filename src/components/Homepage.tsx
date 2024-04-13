import "./Homepage.css";
import pizzaImg from "/pizza.jpg";

import RecipeItemCard from "./RecipeItemCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRecipes } from "../utils/fetchRecipes.ts";
import { useNavigate } from "react-router-dom";
import Nav from "../small components/Nav";

import RangeSelector from "../small components/RangeSelector";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useInView } from "react-intersection-observer";

type queryDataObj = {
  diet: {
    gluten_free: boolean;
    vegetarian: boolean;
  };
  ready_in: {
    "<_10_minutes": boolean;
    "<_20_minutes": boolean;
    "<_30_minutes": boolean;
    "<_60_minutes": boolean;
    "<_90_minutes": boolean;
  };
};

type rangeQueryDataObj = {
  minCalories: string | number;
  maxCalories: string | number;
  minProtein: string | number;
  maxProtein: string | number;
  minFat: string | number;
  maxFat: string | number;
  minCarbs: string | number;
  maxCarbs: string | number;
};

const Homepage = () => {
  const navigate = useNavigate();

  const { ref, inView } = useInView();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [rangeQueryData, setRangeQueryData] = useState<rangeQueryDataObj>({
    minCalories: "",
    maxCalories: "",
    minProtein: "",
    maxProtein: "",
    minFat: "",
    maxFat: "",
    minCarbs: "",
    maxCarbs: "",
  });

  console.log(rangeQueryData);

  const [queryData, setQueryData] = useState<queryDataObj>({
    diet: {
      gluten_free: false,
      vegetarian: false,
    },
    ready_in: {
      "<_10_minutes": false,
      "<_20_minutes": false,
      "<_30_minutes": false,
      "<_60_minutes": false,
      "<_90_minutes": false,
    },
  });

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [searchTerm, queryData, rangeQueryData],
    queryFn: ({ signal, pageParam }): ReturnType<typeof fetchRecipes> =>
      fetchRecipes({
        signal,
        searchTerm,
        queryData,
        rangeQueryData,
        pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages): number | undefined => {
      const nextPage = lastPage?.length < 9 ? undefined : allPages.length + 1;
      return nextPage;
    },
  });

  const handleRecipeClick = function (id: string) {
    navigate(`/${id}`);
  };

  const handleRangeFilterChange = function (type: string, newValue: number[]) {
    if (type === "Calories") {
      setRangeQueryData((prev) => {
        return { ...prev, minCalories: newValue[0], maxCalories: newValue[1] };
      });
    }
    if (type === "Protein") {
      setRangeQueryData((prev) => {
        return { ...prev, minProtein: newValue[0], maxProtein: newValue[1] };
      });
    }
    if (type === "Fat") {
      setRangeQueryData((prev) => {
        return { ...prev, minFat: newValue[0], maxFat: newValue[1] };
      });
    }
    if (type === "Carbs") {
      setRangeQueryData((prev) => {
        return { ...prev, minCarbs: newValue[0], maxCarbs: newValue[1] };
      });
    }
  };

  console.log(queryData);
  const handleFilterChange = function (
    type: string,
    newValue: keyof queryDataObj["diet" | "ready_in"]
  ) {
    console.log(newValue);
    if (type === "diet")
      setQueryData((prev) => {
        return {
          ...prev,
          diet: { ...prev.diet, [newValue]: !prev.diet[newValue] },
        };
      });

    if (type === "ready_in")
      setQueryData((prev) => {
        return {
          ...prev,
          ready_in: { ...prev.ready_in, [newValue]: !prev.ready_in[newValue] },
        };
      });
  };

  const putSearchTerm = function (val: string) {
    setSearchTerm(val);
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      <div className="header">
        <img className="pizza-img" src={pizzaImg} alt="pizza image" />
        <Nav type="Homepage" putSearchTerm={putSearchTerm} />
      </div>
      <div className="main">
        <div className="sidebar">
          <div className="diet-filter filter">
            <h2>Diet</h2>
            <div className="input-group">
              <input
                type="checkbox"
                id="gluten-free"
                name="gluten-free"
                value="gluten-free"
                onChange={() => {
                  handleFilterChange(
                    "diet",
                    "gluten_free" as keyof queryDataObj["diet" | "ready_in"]
                  );
                }}
              />
              <label htmlFor="gluten-free"> gluten free</label>
            </div>
            <div className="input-group">
              <input
                type="checkbox"
                id="vegetarian"
                name="vegetarian"
                value="vegetarian"
                onChange={() => {
                  handleFilterChange(
                    "diet",
                    "vegetarian" as keyof queryDataObj["diet" | "ready_in"]
                  );
                }}
              />
              <label htmlFor="vegetarian"> vegetarian</label>
            </div>
          </div>

          <div className="ready-in-filter filter">
            <h2>Ready In</h2>
            <div className="input-group">
              <input
                type="checkbox"
                id="10mins"
                name="10mins"
                value="10 mins"
                onChange={() => {
                  handleFilterChange(
                    "ready_in",
                    "<_10_minutes" as keyof queryDataObj["diet" | "ready_in"]
                  );
                }}
              />
              <label htmlFor="10mins"> &lt; 10 minutes</label>
            </div>
            <div className="input-group">
              <input
                type="checkbox"
                id="20mins"
                name="20mins"
                value="20 min"
                onChange={() => {
                  handleFilterChange(
                    "ready_in",
                    "<_20_minutes" as keyof queryDataObj["diet" | "ready_in"]
                  );
                }}
              />
              <label htmlFor="20mins"> &lt; 20 minutes</label>
            </div>
            <div className="input-group">
              <input
                type="checkbox"
                id="30mins"
                name="30mins"
                value="30 min"
                onChange={() => {
                  handleFilterChange(
                    "ready_in",
                    "<_30_minutes" as keyof queryDataObj["diet" | "ready_in"]
                  );
                }}
              />
              <label htmlFor="30mins"> &lt; 30 minutes</label>
            </div>
            <div className="input-group">
              <input
                type="checkbox"
                id="1hour"
                name="1hour"
                value="1 hour"
                onChange={() => {
                  handleFilterChange(
                    "ready_in",
                    "<_60_minutes" as keyof queryDataObj["diet" | "ready_in"]
                  );
                }}
              />
              <label htmlFor="1hour"> &lt; 1 hour</label>
            </div>
            <div className="input-group">
              <input
                type="checkbox"
                id="1.5hours"
                name="1.5hours"
                value="1.5 hours"
                onChange={() => {
                  handleFilterChange(
                    "ready_in",
                    "<_90_minutes" as keyof queryDataObj["diet" | "ready_in"]
                  );
                }}
              />
              <label htmlFor="1.5hours"> &lt; 1.5 hours</label>
            </div>
          </div>

          <div className="calories-filter range-filter">
            <RangeSelector
              type="Calories"
              handleRangeFilterChange={handleRangeFilterChange}
              min={10}
              max={1000}
            />
          </div>

          <div className="protein-filter range-filter">
            <RangeSelector
              type="Protein"
              handleRangeFilterChange={handleRangeFilterChange}
              min={0.1}
              max={100}
            />
          </div>

          <div className="fat-filter range-filter">
            <RangeSelector
              type="Fat"
              handleRangeFilterChange={handleRangeFilterChange}
              min={0.1}
              max={100}
            />
          </div>

          <div className="carbs-filter range-filter">
            <RangeSelector
              type="Carbs"
              handleRangeFilterChange={handleRangeFilterChange}
              min={0.1}
              max={100}
            />
          </div>
        </div>
        {data && (
          <div className="recipes">
            {data?.pages.map((page) =>
              page.results.map((recipeItem: any) => {
                return (
                  <RecipeItemCard
                    key={recipeItem.id}
                    imageUrl={recipeItem.image}
                    title={recipeItem.title}
                    onClick={() => {
                      handleRecipeClick(recipeItem.id);
                    }}
                  />
                );
              })
            )}
            <p ref={ref} className="fetch-more">
              {!hasNextPage ? "Looks like there's nothing more" : "Loading"}
            </p>
          </div>
        )}
        {status === "pending" && (
          <Box className="loading-container" textAlign="center">
            <CircularProgress />{" "}
          </Box>
        )}
        {status === "error" && (
          <p>Your daily limit has been exhausted. Payment required</p>
        )}
      </div>
    </>
  );
};

export default Homepage;
