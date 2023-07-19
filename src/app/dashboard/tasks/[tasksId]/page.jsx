"use client";

export default function Update({ params }) {
  const { tasksId } = params;

  return <div>View - {tasksId} </div>;
}
