import React, { useState } from 'react';
import coursesData from './ds.js';
import "./Courses.css"
function CourseCard({ course, onEnroll }) {
  const [enrolled, setEnrolled] = useState(false);

  const handleEnroll = () => {
    setEnrolled(true);
    onEnroll(course); // Callback to notify parent component about enrollment
  };

  return (
    <div className="card">
      <h3>{course.name}</h3>
      <table>
        <tbody>
          <tr>
            <td><strong>Type:</strong></td>
            <td>{course.type}</td>
          </tr>
          <tr>
            <td><strong>Duration:</strong></td>
            <td>{course.duration}</td>
          </tr>
          <tr>
            <td><strong>Fees:</strong></td>
            <td>{course.fees}</td>
          </tr>
          <tr>
            <td><strong>Enrollment:</strong></td>
            <td>{course.enrollment}</td>
          </tr>
        </tbody>
      </table>
      {!enrolled && <button onClick={handleEnroll}>Enroll</button>}
      {enrolled && <span>Enrolled!</span>}
    </div>
  );
}

function Courses() {
  const [courses, setCourses] = useState(coursesData);
  const [userCourses, setUserCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEnroll = (course) => {
    setUserCourses([...userCourses, course]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredCourses = coursesData.filter(course =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCourses(filteredCourses);
    setSearchQuery('');
  };

  return (
    <div className="content">
    
      <div className='search-content'>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a course..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div id="section">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
        ))}
      </div>
      <div className='MyCourses' >
        <h2>User Courses</h2>
        <ul>
          {userCourses.map(course => (
            <li key={course.id}>{course.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Courses;
