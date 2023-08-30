/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from "react";
import useFetch from "../../custom-hooks/useFetch";
import { Course, backendSuccessResponse } from "../../types/types";
import SearchBar from "../reusable/searchBar/SearchBar.tsx";
import CourseList from "../reusable/course/CourseList";
import { CourseContext } from "../../context/CourseContext";
import { Button } from "reactstrap";
import AddModal from "../reusable/modal/AddModal.tsx";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [pageNumber, setPageNumber] = useState(0);
  const [showPagination, setShowPagination] = useState(true);
  const { courseSetters, courses } = useContext(CourseContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const data = useFetch<backendSuccessResponse<Course[]>>({
    endpoint: `course/getAllCourses?page=${pageNumber}`,
    dependsOn: [pageNumber],
  });

  function incrementPageNumber() {
    setPageNumber((prev) => prev + 1);
  }

  function decrementPageNumber() {
    setPageNumber((prev) => prev - 1);
  }

  useEffect(() => {
    if (data.state === "complete" && Array.isArray(data.response?.response)) {
      const saveAsInitial = data.response?.response.length !== 0;

      courseSetters?.setCourses(
        data.response?.response as Course[],
        saveAsInitial
      );
    }
  }, [pageNumber, data.state, data.response?.response]);

  let result;
  if (data.state === "loading") {
    result = <div>Loading...</div>;
  }

  if (data.state === "error" && data.errorMessage) {
    result = <div>{data.errorMessage}</div>;
  }

  if (courses.length === 0) {
    result = (
      <div className="flex flex-col gap-4 items-center justify-center w-full text-gray-800">
        No courses found!
        {pageNumber > 0 ? (
          <Button onClick={decrementPageNumber}>PreviousPage</Button>
        ) : null}
      </div>
    );
  }
  return (
    <main className="relative flex flex-col py-10 sm:flex-row">
      <div className="absolute flex gap-2 top-[-4px] left-4">
        <Link to="bulkInsert">
          <Button color="primary">Bulk Insert</Button>
        </Link>
        <Button onClick={() => setShowAddModal(true)}>Add Course ➕</Button>
      </div>
      <SearchBar setShowPagination={setShowPagination} />
      {result || (
        <CourseList
          courses={courses}
          showPagination={showPagination}
          incrementPage={incrementPageNumber}
          decrementPage={decrementPageNumber}
          pageNumber={pageNumber}
        ></CourseList>
      )}
      <AddModal show={showAddModal} setShow={setShowAddModal}></AddModal>
    </main>
  );
}
