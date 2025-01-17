"use client";
import React from "react";
import {CreateForm, FormList} from "./_components";

const Dashboard = () => {
  return (
    <div className="p-10">
      <div className="h-full flex justify-between items-center">
        <h2 className="font-bold text-3xl ">Dashboard</h2>
        <CreateForm />
      </div>
      <FormList />
    </div>
  );
};

export default Dashboard;
