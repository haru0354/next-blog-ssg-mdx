import SideCategory2 from "./sideMenu/SideCategory2";
import SideLinks from "./sideMenu/SideLinks";
import SideNewArticle2 from "./sideMenu/SideNewArticle2";
import SideRecommendArticles from "./sideMenu/SideRecommendArticles";
import SideTopImage from "./sideMenu/SideTopImage";

const SideMenu = () => {
  return (
    <div className=" w-full rounded flex flex-col md:w-[300px] mt-8 md:mt-0">
      <SideTopImage />
      <SideRecommendArticles/>
      <SideCategory2 />
      <SideNewArticle2 />
      <SideLinks />
    </div>
  );
};

export default SideMenu;
