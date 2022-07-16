import { Form, Formik } from "formik";
import { useEffect, useMemo } from "react";
import * as Yup from "yup";
import { Button, FormikField } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  loggedInUserInfo,
  updateUserDetails,
} from "../../../redux/features/Auth/thunk";
import { getUserInfo } from "../../../redux/features/User/thunk";
import { FieldType, EditUserType } from "../../../types";

type EditProps = {
  closeEditForm: () => void;
};

export default function EditUserForm({
  closeEditForm,
}: EditProps): JSX.Element {
  const { user: curUser } = useAppSelector((s) => s.userReducer);
  const user: EditUserType = {
    bio: curUser?.bio || "",
    website: curUser?.website || "",
    userName: curUser?.userName || "",
  };
  const dispatch = useAppDispatch();

  const handleSubmit = (editUserData: EditUserType) => {
    if (curUser?.uid) {
      dispatch(updateUserDetails(editUserData));
      dispatch(loggedInUserInfo(curUser?.uid));
      dispatch(getUserInfo(curUser?.userName));
      closeEditForm();
    }
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required(),
    bio: Yup.string().required(),
    website: Yup.string().required().url(),
  });

  const fields: FieldType[] = useMemo(() => {
    return [
      {
        id: "userName",
        type: "text",
        name: "userName",
        label: "userName",
        placeholder: "Enter username",
      },
      {
        id: "bio",
        type: "text",
        name: "bio",
        label: "bio",
        placeholder: "Add few lines about yourself...",
      },
      {
        id: "website",
        type: "url",
        name: "website",
        label: "Website",
        placeholder: "Website / Important links",
      },
    ];
  }, []);

  return (
    <Formik
      initialValues={user}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      {(formik) => (
        <Form>
          {fields.map((field) => (
            <FormikField
              key={field.id}
              id={field.id}
              label={field.label}
              name={field.name}
              type={field.type}
            />
          ))}
          <Button
            variant="secondary__cta"
            type="submit"
            disabled={!formik?.dirty}>
            Save Changes
          </Button>
        </Form>
      )}
    </Formik>
  );
}
