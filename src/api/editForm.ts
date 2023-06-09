import axios from 'axios';

const token = localStorage.getItem('accessToken');

// const URL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API : process.env.REACT_APP_API_LOCAL;

export const editFormInfo = async (userId: number, formId: number, title: string, content: string) =>
  await axios
    .put(
      `/form/updateSelectform/${userId}/${formId}`,
      {
        title,
        content,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((res) => res.data);
// .catch((err) => console.error(err));

export const deleteQue = async (formId: number, queId: number) => {
  try {
    await axios.delete(`/question/DeleteSelectquestion/${formId}/${queId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    // console.error(error);
  }
};

export const selectInfoUpdate = async (
  formId: number,
  queId: number,
  title?: string,
  required?: boolean,
  sectionNum?: number
) => {
  try {
    await axios.put(
      `/question/UpdateSelectQuestion/${formId}/${queId}`,
      {
        title,
        required,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    // console.error(error);
  }
};

export const updateContent = async (formId: number, queId: number, content: string) => {
  try {
    await axios.put(
      `/selection/updateContent/${formId}/${queId}`,
      {
        content,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    // console.error(error);
  }
};

export const deleteContent = async (optId: number) => {
  try {
    await axios.delete(`/selection/deleteSelection/${optId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    // console.error(error);
  }
};

export const addContent = async (data: { queId: number; content: string; linear?: boolean }) => {
  try {
    const { queId, content, linear } = data;
    const { data: id } = await axios.post(
      `/selection/createSelection/${queId}`,
      { content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return id[id.length - 1];
  } catch (error) {
    // console.error(error);
  }
};

export const updateLinear = async (data: { content: string[]; queId: number }) => {
  try {
    const { content, queId } = data;
    const res: { data: { id: number; content: string }[] } = await axios.post(
      `/selection/createLinear/${queId}`,
      {
        content,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data;
  } catch (err) {
    // console.log(err);
  }
};
