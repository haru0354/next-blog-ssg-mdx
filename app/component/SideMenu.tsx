import SideCategory2 from "./sideMenu/SideCategory2";
import SideLinks from "./sideMenu/SideLinks";
import SideNewArticle2 from "./sideMenu/SideNewArticle2";
import SideRecommendArticles from "./sideMenu/SideRecommendArticles";
import SideImage from "./sideMenu/SideImage";
import SideImageBottom from "./sideMenu/SideImageBottom";

const SideMenu = () => {
  return (
    <div className=" w-full rounded flex flex-col md:w-[300px] mt-8 md:mt-0">
      <SideImage />
      <SideRecommendArticles/>
      <SideCategory2 />
      <SideNewArticle2 />
      <SideLinks />
      <SideImageBottom />
    </div>
  );
};

export default SideMenu;
