export default function PersonalInformation(){
  const inputStyle = 'p-2 bg-transparent border-b-2 border-cyan-900 text-gray-700 outline-none ';
    return <div className="h-screen flex flex-col gap-4 items-center justify-center bg-gray-50">
      <form className="flex items-start justify-start flex-col gap-6 bg-slate-300 p-8 rounded-lg shadow-xl">
        <h1 className="font-sans text-4xl font-bold">Personal Information</h1>
        <div className="flex gap-2 items-center justify-center">
          <label htmlFor="birthday" className="">Birthday:</label>
          <input className={inputStyle} type="date" name="birthday" id="birthday" />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <label htmlFor="gender" className="">Gender:</label>
          <select className={inputStyle} name="gender" id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex gap-3">
          <label htmlFor="div">Do you dream often?</label>
          <label htmlFor="yes">Yes</label>
          <input type="radio" name="question" id="yes" />
          <label htmlFor="no">No</label>
          <input type="radio" name="question" id="no" />
        </div>
        <div className="flex gap-3">
          <label htmlFor="div">Are your dreams clear?</label>
          <label htmlFor="yes">Yes</label>
          <input type="radio" name="question1" id="yes" />
          <label htmlFor="no">No</label>
          <input type="radio" name="question1" id="no" />
        </div>
        <button className="bg-cyan-900 font-sans text-white p-2 rounded-lg w-full shadow-xl" type="submit">Save</button>
      </form>
    </div>;
}
