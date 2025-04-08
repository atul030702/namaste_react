import linkedInIcon from "../assets/linkedin.webp";
import gitHubIcon from "../assets/github.webp";
import myImage from "../assets/me.webp";

const AboutMe = () => {

    return (
        <div className="aboutMe-div flex flex-col items-center justify-center my-5 mx-auto p-2.5 rounded-xl
            w-max h-min shadow-[-1px_5px_10px_5px_rgba(112,112,112,0.2)]"
        >
            <h1 className="font-semibold text-3xl">About Me</h1>
            <img src={myImage} alt="profile-icon" loading="lazy" draggable="false" className="size-[150px] m-[5px] rounded-[50%]"/>
            <p className="text-[18px] font-light text-[#575757] mx-[10px] text-center">
                React.js | JavaScript | Tailwind | Frontend Developer
            </p>
            <div className="flex justify-center items-center gap-2.5">
                <a href="https://www.linkedin.com/in/atul-kumar-b8a33b2a2/" target="_blank" rel="noopener noreferrer" title="Connect on LinkedIn"
                    className="m-[5px] hover:scale-[1.1]"
                >
                    <img src={linkedInIcon} alt="linkedin-icon" loading="lazy" draggable="false" className="size-[41px]"/>
                </a>
                <a href="https://github.com/atul030702/" target="_blank" rel="noopener noreferrer" title="GitHub"
                    className="m-[5px] hover:scale-[1.1]"
                >
                    <img src={gitHubIcon} alt="github-icon" loading="lazy" draggable="false" className="size-[40px]"/>
                </a>
            </div>
        </div>

    );
};

export default AboutMe;