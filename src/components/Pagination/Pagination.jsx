import { pagination, disabled } from "./Pagination.module.css";

export const Pagination = ({ count, current, onPrev, onNext }) => {
  const isNextDisabled = current === 0 || count <= 5;
  const isPrevDisabled = current === Math.trunc(count / 5);
  return (
    <div className={pagination}>
      <button
        onClick={isNextDisabled ? null : onPrev}
        className={isNextDisabled ? disabled : null}
      >
        &lt;
      </button>
      <button>{current + 1}</button>
      <button
        onClick={isPrevDisabled ? null : onNext}
        className={isPrevDisabled ? disabled : null}
      >
        &gt;
      </button>
    </div>
  );
};
