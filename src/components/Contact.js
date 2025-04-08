import contactIcon from "../assets/contact.svg";

const ContactUS = () => {
    return (
        <div className="contact-div flex justify-evenly items-center w-max h-max m-auto p-2 flex-wrap">
            <div className="flex h-[300px] w-[300px] justify-center items-end">
                <img src={contactIcon} alt="contact-Icon" className="size-75" draggable="false" loading="lazy"/>
            </div>
            <div className="contact-text-area flex flex-col items-center justify-center w-[450px] h-full m-2.5">
                <h1 className="text-5xl font-semibold w-max text-[#353535] text-center my-1">
                    Contact Us
                </h1>
                <input type="text" placeholder="Name" required 
                    className="px-2.5 py-1.5 m-2.5 box-border border-2 focus:shadow focus:ring-2 focus:ring-[#c26100]/50
                    border-[#c26100] rounded-lg w-full focus:border-2 focus:outline-none"
                />
                <input type="email" placeholder="Email" required 
                    className="px-2.5 py-1.5 m-2.5 box-border border-solid border-2 focus:shadow focus:ring-2 focus:ring-[#c26100]/50
                    border-[#c26100] rounded-lg w-full focus:outline-none"
                />
                <textarea placeholder="Type your message here..." required
                    className="px-2.5 p-2.5 m-2.5 box-border border-solid border-2 focus:outline-none
                    border-[#c26100] rounded-lg w-full focus:shadow focus:ring-2 focus:ring-[#c26100]/50"
                >
                </textarea>
                <button type="submit" className="py-2.5 px-5 m-2.5 text-xl text-white font-semibold bg-[#c26100] 
                    rounded-xl cursor-pointer hover:scale-[1.1] transition"
                >
                    Submit
                </button>
            </div>
        </div>
    )
};

export default ContactUS;