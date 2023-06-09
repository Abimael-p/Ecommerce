import { useEffect, useRef, useState } from "react";
import { useCategories } from "../../../Hooks/query/useCategories";
import "./CategoriesFilter.css"

const CategoriesFilter = ({
  formId,
  onChangeCategories,
  initialCategories = [],
}) => {
  const { data, isLoading, isError, error } = useCategories();
  const [categoryIdList, setcategoryIdList] = useState(initialCategories);
  const isFirstRender = useRef(true);

  const addIdToList = (categoryId) => {
    const copyList = structuredClone(categoryIdList);
    copyList.push(categoryId);

    const copyWithoutRepeats = Array.from(new Set(copyList));

    if (copyWithoutRepeats.length === data.length) setcategoryIdList([]);
    else setcategoryIdList(copyWithoutRepeats);
  };

  const removeIdFromList = (categoryId) => {
    const listWithoutId = categoryIdList.filter((id) => id === categoryId);
    setcategoryIdList(listWithoutId);
  };

  const handleChange = (isChecked, categoryId) => {
    if (isChecked) addIdToList(categoryId);
    else removeIdFromList(categoryId);
  };

  const handleEmpty = (isChecked) => {
    if (isChecked) setcategoryIdList([]);
  };

  useEffect(() => {
    if (isFirstRender.current) isFirstRender.current = false;
    else onChangeCategories();
  }, [categoryIdList, onChangeCategories]);

  if (isLoading) return <p>loading categories...</p>;
  if (isError) return <p>{error.message ?? "could not get categories"}</p>;

  return (
    <fieldset form={formId}>
      <legend>Categories</legend>
      <div className="container__categories__search">
        <input
          checked={categoryIdList.length == 0}
          onChange={(e) => handleEmpty(e.target.checked)}
          name="categories"
          type="checkbox"
          value=""
          id="empty-categories"
          form={formId}
        />
        <label htmlFor="empty-categories">All</label>
      </div>
      {data.map((category) => (
        <div className="container__categories__search" key={category.id}>
          <input
            checked={categoryIdList.includes(category.id)}
            onChange={(e) => handleChange(e.target.checked, category.id)}
            name="categories"
            type="checkbox"
            value={category.id}
            id={category.id + "category"}
            form={formId}
          />
          <label htmlFor={category.id + "category"}>{category.name}</label>
        </div>
      ))}
    </fieldset>
  );
};

export default CategoriesFilter;
