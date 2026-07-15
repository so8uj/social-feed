import { useFeedContext } from "../../context/FeedContext";
import FeedBox from "./FeedBox";
import FeedPageTop from "./feedPageTop";

export default function MiddleLayout() {
  const { feeds } = useFeedContext();

  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
      <div className="_layout_middle_wrap">
        <div className="_layout_middle_inner">
          <FeedPageTop />

          {feeds?.map((feed) => (
            <FeedBox key={feed.id} feed={feed} />
          ))}
        </div>
      </div>
    </div>
  );
}
