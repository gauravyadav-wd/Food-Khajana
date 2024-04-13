import { Slider } from "@mui/material";
import { useRef, useState } from "react";

import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

type RangeSelectorProps = {
  type: string;
  handleRangeFilterChange: (type: string, newValue: number[]) => void;
  min: number;
  max: number;
};

const RangeSelector = ({
  type,
  handleRangeFilterChange,
  min,
  max,
}: RangeSelectorProps) => {
  const [value, setValue] = useState([min, max]);

  const handleChange = (
    event: InputEvent,
    newValue: number[],
    activeThumb: number
  ) => {
    setValue(newValue);

    //MATERIAL UI CODE
    const minDistance = min;

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  function valuetext(value: number): string {
    return `${value}`;
  }

  const handleMouseLeave = function () {
    handleRangeFilterChange(type, value);
  };

  const minRef = useRef<HTMLInputElement>();
  const maxRef = useRef<HTMLInputElement>();

  return (
    <>
      <h2>{type}</h2>
      <Slider
        getAriaLabel={() => "Calories range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        max={max}
        min={min}
        sx={{ width: "200px" }}
        disableSwap
        onMouseLeave={handleMouseLeave}
      />
      <div className="minmax ">
        <div className="min">
          <p>Min</p>
          <input
            type="number"
            ref={minRef}
            onChange={() => {
              setValue((prev) => {
                return [Number(minRef!.current!.value), prev[1]];
              });
            }}
            max={max}
            min={min}
            value={value[0]}
          />
        </div>
        <div className="max">
          <p>Max</p>
          <input
            type="number"
            ref={maxRef}
            onChange={() => {
              setValue((prev) => {
                return [prev[0], Number(maxRef!.current!.value)];
              });
            }}
            max={max}
            min={min}
            value={value[1]}
          />
        </div>
        <span>
          <ArrowCircleRightOutlinedIcon
            onClick={handleMouseLeave}
            sx={{ color: "#3f51b5" }}
          />
        </span>
      </div>
    </>
  );
};

export default RangeSelector;
