import "styled-components/macro";

import * as yup from "yup";

import { FormField, UICore } from "../../../components";
import { useEffect, useState } from "react";

import { Formik } from "formik";
import { db } from "../../../utils";
import { toast } from "sonner";

const UpdateTaskSchema = yup.object().shape({
  title: yup.string().required(),
  status: yup
    .string()
    .oneOf(["not yet started", "in progress", "completed", "past due"]),
  description: yup.string().required(),
  dueDate: yup.date(),
  employeeId: yup.string().nullable(),
});

const initialValues = {
  title: "",
  status: "not yet started",
  description: "",
  dueDate: new Date(),
  employeeId: null,
};

function UpdateTaskForm({ onSuccess = () => {}, id, data }) {
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    let employees = await db.employee.readAll();
    setOptions(
      employees.map((employee) => {
        return { text: employee?.name, value: employee?.id };
      })
    );
  });

  return (
    <Formik
      initialValues={data || initialValues}
      enableReinitialize
      validationSchema={UpdateTaskSchema}
      onSubmit={async (values) => {
        try {
          await db.task.update(id, values);
          toast.success("Task updated successfully");
          onSuccess();
        } catch (error) {
          console.log(error);
          toast.error(
            "There was an error processing your request, try again later"
          );
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        isValid,
        touched,
      }) => (
        <form onSubmit={handleSubmit}>
          <FormField.Input
            labelColor="var(--text-light)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            label="Title"
            helper={touched.title && errors.title}
            helperColor={errors?.title && "var(--danger)"}
            name="title"
            mb="var(--space-md)"
          />

          <FormField.Input
            labelColor="var(--text-light)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.dueDate}
            label="Due date"
            helper={touched.dueDate && errors.dueDate}
            helperColor={errors?.dueDate && "var(--danger)"}
            name="dueDate"
            type="date"
            mb="var(--space-md)"
          />

          <FormField.Select
            labelColor="var(--text-light)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.status}
            label="Status"
            helper={touched.status && errors.status}
            helperColor={errors?.status && "var(--danger)"}
            name="status"
            mb="var(--space-md)"
            options={[
              { text: "not yet started", value: "not yet started" },
              { text: "in progress", value: "in progress" },
              { text: "completed", value: "completed" },
              { text: "past due", value: "past due" },
            ]}
          />

          <FormField.Select
            labelColor="var(--text-light)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.employeeId}
            label="Assigned Employee"
            helper={touched.employeeId && errors.employeeId}
            helperColor={errors?.employeeId && "var(--danger)"}
            name="employeeId"
            mb="var(--space-md)"
            options={options}
          />

          <FormField.Textarea
            labelColor="var(--text-light)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            label="Task description"
            helper={touched.description && errors.description}
            helperColor={errors?.description ? "var(--danger)" : "initial"}
            name="description"
            mb="var(--space-md)"
          />

          <UICore.Button
            type="submit"
            fullWidth
            size="md"
            disabled={!isValid}
            className="margin-top--md margin-bottom-sm"
          >
            Save
          </UICore.Button>
        </form>
      )}
    </Formik>
  );
}

export default UpdateTaskForm;
