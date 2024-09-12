import SideCategory2 from "./sideMenu/SideCategory2";
import SideLinks from "./sideMenu/SideLinks";
import SideNewArticle2 from "./sideMenu/SideNewArticle2";
import SideRecommendArticles from "./sideMenu/SideRecommendArticles";
import SideImage from "./sideMenu/SideImage";
import SideImageBottom from "./sideMenu/SideImageBottom";
import SideChildCategory from "./sideMenu/SideChildCategory";
import SideSearchBar from "./sideMenu/SideSearchBar";

type SideMenuProps = {
  firstLevelArticle_slug?: string;
  categoryName?: string;
};

const SideMenu: React.FC<SideMenuProps> = ({
  firstLevelArticle_slug,
  categoryName,
}) => {
  return (
    <div className=" w-full rounded flex flex-col md:w-[300px] mt-8 md:mt-0">
      <SideImage />
      <SideRecommendArticles />
      {firstLevelArticle_slug && (
        <SideChildCategory
          firstLevelArticle_slug={firstLevelArticle_slug}
          categoryName={categoryName}
        />
      )}
      <SideCategory2 />
      <SideNewArticle2 />
      <SideLinks />
      <SideImageBottom />
      <SideSearchBar />
    </div>
  );
};

export default SideMenu;
