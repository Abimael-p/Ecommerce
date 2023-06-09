import { useCallback, useEffect, useId, useRef, useState } from "react";
import ProductList from "../../components/Home/ProductList/ProductList";
import CategoriesFilter from "../../components/Home/categoriesFilter/categoriesFilter";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const formId = useId();
  const submit = useSubmit();
  const formRef = useRef();
  const { categories, title } = useLoaderData();
  const [titleValue, setTitleValue] = useState(title);

  const handleChangeCategories = useCallback(() => {
    if (!formRef.current) return;

    submit(formRef.current);
  }, [submit]);

  useEffect(() => {
    setTitleValue(title);
  }, [title]);

  return (
    <div className="home__container">
      <aside>
        <CategoriesFilter
          formId={formId}
          onChangeCategories={handleChangeCategories}
          initialCategories={categories}
        />
      </aside>
      <section>
        <Form  className="container__search" id={formId} ref={formRef}>
          <p className="search">search</p>
          <input
            className="search__title"
            type="search"
            name="title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            placeholder="what are you looking for?"
          />
        </Form>
        <ProductList categories={categories} title={title} />
      </section>
    </div>
  );
};

export default Home;
