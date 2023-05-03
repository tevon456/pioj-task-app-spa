import "styled-components/macro";

import * as yup from "yup";

import { FormField, UICore } from "../components";

import { Formik } from "formik";
import { db } from "../utils";

const CreateEmployeeSchema = yup.object().shape({
  name: yup.string().required(),
  department: yup.string().required(),
});

const initialValues = {
  name: "",
  department: "",
};

function CreateEmployeeForm({ onSuccess = () => {} }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateEmployeeSchema}
      onSubmit={async (values) => {
        try {
          await db.employee.create(values);
          onSuccess();
        } catch (error) {
          console.log(error);
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
            value={values.name}
            label="Full name"
            helper={touched.name && errors.name}
            helperColor={errors?.name && "var(--warning)"}
            name="name"
            mb="var(--space-md)"
          />

          <FormField.Input
            labelColor="var(--text-light)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.department}
            defaultValue={new Date()}
            label="Department"
            helper={touched.department && errors.department}
            helperColor={errors?.department && "var(--warning)"}
            name="department"
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

export default CreateEmployeeForm;
