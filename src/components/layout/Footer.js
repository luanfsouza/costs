import styles from './Footer.module.css'
import { AiFillLinkedin, AiFillGithub, AiOutlineMail } from "react-icons/ai";
function Footer(){
    return (
      <footer className={styles.footer}>
        <ul className={styles.social_list}>
          <li>
            <a
              href="https://www.linkedin.com/in/luan-ferreira-6b4a25181/"
              target="_blank"
            >
              {<AiFillLinkedin />}
            </a>
          </li>
          <li>
            <a href="https://github.com/luanfsouza/costs" target="_blank">
              {<AiFillGithub />}
            </a>
          </li>
          <li>
            <a href="https://is.gd/ltuM33" target="_blank">
              {<AiOutlineMail />}
            </a>
          </li>
        </ul>
        <p className={styles.copy_right}>
          <span>Costs</span> &copy;2021
        </p>
      </footer>
    );
}
export default Footer