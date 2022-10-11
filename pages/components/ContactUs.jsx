import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { AiFillCloseCircle } from "react-icons/ai";
const AlertBox = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          className="dark:bg-green-100"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <AiFillCloseCircle />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Message sent!
        </Alert>
      </Collapse>
    </Box>
  );
};

const ContactUs = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [name, setName] = useState("");

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }

    setMessage(event.target.value);
  };

  const [result, setresult] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_g77d8n7",
        "template_6773uzs",
        form.current,
        "jiFwJWqhqPYIKVJUd"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    setresult(true);
  };
  return (
    <form ref={form} className=" w-full max-w-lg" onSubmit={sendEmail}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2 dark:text-white"
            htmlFor="grid-first-name"
          >
            Full Name
          </label>
          <input
            className="border-1 border-teal-700 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            name="from_name"
            placeholder="Ahmed"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2 dark:text-white"
            htmlFor="grid-password"
          >
            E-mail
          </label>
          <input
            className={`${
              error ? "border-1 border-red-600" : "border-1 border-teal-700"
            }  border-1 border-teal-700 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="email"
            type="email"
            name="email"
            placeholder="ahmed@gmail.com"
            value={message}
            onChange={handleChange}
          />
          {error && <h2 style={{ color: "red" }}>{error}</h2>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-0"></div>
      <div className="flex flex-wrap -mx-3 mb-1">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2 dark:text-white"
            htmlFor="grid-password"
          >
            Message
          </label>
          <textarea
            className=" border-1 border-teal-700 no-resize appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
            id="message"
            name="message"
            placeholder="Assalam Alaikum..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="md:flex md:items-center">
        <div className="md:w-1/3 ">
          <button
            disabled={!name && !inputVal}
            className={`${
              !inputVal || !name
                ? "bg-slate-600 shadow focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-9"
                : "bg-gradient-to-r from-cyan-500 to-teal-600 shadow focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-9"
            }`}
            type="submit"
          >
            Send
          </button>
        </div>
        <div className="md:w-2/3 relative text-2xl gap-16 py-3 text-gray-700">
          {result ? (
            <AlertBox className="absolute bottom-0 right-0 dark:text-white" />
          ) : (
            ""
          )}
        </div>
      </div>
    </form>
  );
};

export default ContactUs;
