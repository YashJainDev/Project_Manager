import { useRef, useState } from "react";

export function FormModal({
  title,
  description,
  setTitle,
  setDescription,
  handleForm,
  type
}) {
  const formRef = useRef(null);
  const [date, setDate] = useState();

  const handleDateChange = (e)=>{
    const isoDate = e.target.value;
    const [year, month, day] = isoDate.split("-");
    const formattedDate = new Date(`${year}/${month}/${day}`).toLocaleDateString("en-GB");
    console.log(formattedDate)
    setDate(formattedDate);
  }

  const handleClose = () => {
    setTitle("");
    setDescription("");
    formRef.current?.reset();
    document.getElementById("my_modal_2").close();
  };

  return (
    <div className="modal-box max-w-2xl p-6">
      <div className="modal-action">
        <form method="dialog">
          <button className="btn btn-sm" onClick={handleClose}>
            Close
          </button>
        </form>
      </div>

      <form
        className="flex flex-col gap-4"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleForm(date);
          handleClose();
        }}
      >
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Title</legend>
          <input
            type="text"
            className="input input-bordered w-full validator"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            pattern="[A-Za-z][-_]*$"
            title="Must start with a letter and contain only letters, underscore  or hyphens"
            minLength="10"
            maxLength="35"
          />
          <p className="validator-hint hidden">
            Must be 10 to 35 characters
            <br />
            containing only letters, numbers or dash
          </p>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Description</legend>
          <textarea
            className="textarea textarea-bordered w-full h-24"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            pattern="[A-Za-z][A-Za-z0-9\-_ ]*$"
            title="Must start with a letter and contain only letters"
            minLength="0"
            maxLength="150"
          ></textarea>
          <p className="validator-hint hidden">
            Must be up to 150 characters
            <br />
            containing only letters or numbers
          </p>
        </fieldset>

        {type === "Task" && (
            <fieldset className="fieldset">
                <label className="fieldset-legend">Due Date</label>
                <input type="date" className="input w-full validator" required  onChange={(e)=>{handleDateChange(e)}}/>
                <p className="validator-hint">Date must be after today</p>
            </fieldset>
        )}

        <button className="btn btn-primary self-center" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
