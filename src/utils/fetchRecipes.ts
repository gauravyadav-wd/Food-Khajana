import {
  processDietFilters,
  processRangeFilters,
  processReadyInFilters,
} from "./processDietFilters";

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

type FetchRecipesArgs = {
  signal: any;
  searchTerm: string;
  queryData: queryDataObj;
  rangeQueryData: rangeQueryDataObj;
  pageParam: number;
};

export const fetchRecipes = async function ({
  signal,
  searchTerm,
  queryData,
  rangeQueryData,
  pageParam,
}: FetchRecipesArgs) {
  const apiKey = localStorage.getItem("apiKey");

  const dietFilterData = processDietFilters(queryData);
  const rangeFilterData = processRangeFilters(rangeQueryData);
  const readyInFilterData = processReadyInFilters(queryData);

  const dietFilterDataFinal = dietFilterData ? "&diet=" + dietFilterData : "";
  const rangeFilterDataFinal = rangeFilterData ? "&" + rangeFilterData : "";
  const readyInFilterDataFinal = readyInFilterData
    ? "&maxReadyTime=" + readyInFilterData
    : "";
  const searchTermFinal = searchTerm ? "&query=" + searchTerm : "";
  const page = pageParam ? `&number=10&offset=${(pageParam - 1) * 10}` : "";

  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}${dietFilterDataFinal}${rangeFilterDataFinal}${readyInFilterDataFinal}${searchTermFinal}${page}`;

  console.log(url);

  const res = await fetch(url, signal);

  if (!res.ok) {
    const error = new Error("An error occured while fetching the data");
    throw error;
  }

  const resData = await res.json();

  return resData;
};
