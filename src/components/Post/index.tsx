import { RawPost } from "@/types";
import styles from "./post.module.css";
export default function Post({ data }: { data: RawPost }) {
  const { title, body } = data;
  return (
    <article className={styles.post}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.body}>{body}</p>
        <h3 className={styles.subtitle}>Lorem ipsum</h3>
        <p className={styles.txt}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrs standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industrys standard dummy text ever since the 1500s.
        </p>
        <img src="/sample.png" alt="sample image" />
      </div>
    </article>
  );
}
