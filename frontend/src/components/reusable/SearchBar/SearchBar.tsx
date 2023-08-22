import { useState } from "react";
import { useCourseContext } from "../../../context/courseContext";
import { CoursesResponse } from "../../../types/types";
import { fetchDataFromAPI } from "../../../utils";

export default function SearchBar() {
  const [category, setCategory] = useState("");
  const ctx = useCourseContext();

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCategory("");
    const formData = new FormData(event.target as HTMLFormElement);
    const keyword = formData.get("keyword");
    const data = (await fetchDataFromAPI({
      endpoint: `course/getAllCoursesByKeyword?keyword=${keyword}`,
    })) as CoursesResponse;

    console.log(data);

    if (data && Array.isArray(data)) ctx.setCourses(data);
    else ctx.setCourses([]);
  }

  async function categoryHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    const category = event.target.value;
    setCategory(category);
    if (category) {
      const data = (await fetchDataFromAPI({
        endpoint: `course/getCoursesByCategory/${category}`,
      })) as CoursesResponse;
      console.log(data);
      if (data && Array.isArray(data)) ctx.setCourses(data);
      else ctx.setCourses([]);
    }
  }

  return (
    <aside className="max-w-md p-4 bg-white border-r-2 border-primary">
      <form className="flex items-center gap-2 mb-6" onSubmit={submitHandler}>
        <input
          type="text"
          name="keyword"
          // value={keyword}
          className="block border-gray-400 border-2 rounded-md p-1 outline-none w-[170px]"
          placeholder="Enter keyword to search for"
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-md transition-all ease-linear"
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="flex justify-between flex-col">
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Search By Category
        </label>
        <select
          onChange={categoryHandler}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          title="select category"
          name="category"
          id="category"
          value={category}
        >
          <option value="">Please Select a Category</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Professional">Professional</option>
        </select>
      </div>
    </aside>
  );
}
