import React from "react";
import FadeIn from 'react-fade-in';
import '../styles/About.css';

const tech_stack = [
    "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png",
    "https://cdn.svgporn.com/logos/dotnet.svg",
    "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png",
    "https://raw.githubusercontent.com/jmnote/z-icons/master/svg/java.svg",
    "https://raw.githubusercontent.com/jmnote/z-icons/master/svg/csharp.svg",
    "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png",
    "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png",
    "https://cdn.svgporn.com/logos/git-icon.svg",
    "https://cdn.svgporn.com/logos/microsoft-azure.svg",
    "https://cdn.svgporn.com/logos/kubernetes.svg"
  ];
  const about = (
    <p>
        Hey there! I'm a <b>Software Engineer</b> who's super curious about all things tech. 
        Right now, I'm working in the world of banking and financial solutions and
        I'm part of the Securities team. Besides work, I love watching movies and I am trying to learn Spanish by myself. I enjoy challenges and keep growing in both regular and work life.
    </p>
  );
  
const About = () =>
{
    return (
        <div id ="about" >
            <FadeIn delay={200}>
                <div className="section-header ">
                    <span className="section-title">/ About Me</span>
                </div>
                <div className="about-content">
                    <div className="about-description">
                        {[about]}
                        {"Here are some technologies I have been working with:"}
                        <ul className="tech-stack">
                            {tech_stack.map(function (tech_item, i) {
                            return (
                                <FadeIn delay={`${i + 1}00`}>
                                    <img height={'30px'} width='30px' src={tech_item}  alt="tech_stack_images"/>
                                </FadeIn>
                            );
                        })}
                        </ul>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
};

export default About;