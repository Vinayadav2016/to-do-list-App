import "./Footer.scss";
import { FaLinkedin, FaGithub } from "react-icons/fa";
export function Footer() {
  return (
    <footer className="footer">
      <div></div>
      <p>
        © 2025 | Created by{" "}
        <a href="https://github.com/Vinayadav2016" target="_blank">
          Vinay Yadav
        </a>
        <a href="https://www.linkedin.com/in/vinayadav2016/" target="_blank">
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/Vinayadav2016/to-do-list-App"
          target="_blank"
        >
          <FaGithub />
        </a>
      </p>
    </footer>
  );
}
