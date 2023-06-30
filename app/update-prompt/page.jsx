"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const useSearchParams = useSearchParams();
  const promptId = useSearchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails;
  }, [promptId]);

  const updatePrompt = (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) alert("Prompt ID not found");

    try {
      const res = async () => {
        await fetch(`api/propmt/${promptId}`, {
          method: "PATCH",
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
          }),
        });
      };
      if (res.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
