import { TeamCard } from "./TeamMember";
function About() {
  const baibhav = {
    name: "Baibhav Panda",
    designation: "Full Stack Developer",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
    link: "https://www.linkedin.com/in/baibhav-kumar-panda-64908a1bb/",
  };
  const shashank = {
    name: "Shashank Agarwal",
    designation: "Full Stack Developer",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
    link: "https://www.linkedin.com/in/shashank-agarwal-670058221/",
  };
  const yash = {
    name: "Yash Kumar Rai",
    designation: "Full Stack Developer",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
  };

  return (
    <>
      <h1 className="font-bold text-white text-center text-5xl">
        Meet Our Team!
      </h1>
      <div className="py-20 sm:py-25 flex gap-10 flex-wrap justify-center align-center">
        <TeamCard member={baibhav} />
        <TeamCard member={shashank} />
        <TeamCard member={yash} />
      </div>
    </>
  );
}
export { About };
