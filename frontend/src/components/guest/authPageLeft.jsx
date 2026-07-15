export default function AuthPageLeft({ leftImage }) {
  return (
    <div className="_social_login_left">
      <div className="_social_login_left_image">
        <img src={leftImage} alt="Image" className="_left_img" />
      </div>
    </div>
  );
}
