import { history } from "@/lib/router";

const PostPage = () => {
  const params = history.getPageParams();
  return (
    <div>
      <h2>PostPage {params}</h2>
      <a data-link href="/">
        go home
      </a>
      &nbsp;&nbsp;
      <a data-link href="/blog">
        go blog
      </a>
    </div>
  );
};

export default PostPage;
