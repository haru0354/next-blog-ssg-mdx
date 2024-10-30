import SideCategory2 from "./side-menu/SideCategory2";
import SideLinks from "./side-menu/SideLinks";
import SideNewArticle2 from "./side-menu/SideNewArticle2";
import SideRecommendArticles from "./side-menu/SideRecommendArticles";
import SideImage from "./side-menu/SideImage";
import SideImageBottom from "./side-menu/SideImageBottom";
import SideChildCategory from "./side-menu/SideChildCategory";
import SideSearchBar from "./side-menu/SideSearchBar";

type SideMenuProps = {
  firstLevelArticle_slug?: string;
  categoryName?: string;
};

const SideMenu: React.FC<SideMenuProps> = ({
  firstLevelArticle_slug,
  categoryName,
}) => {
  return (
    <div className="w-full rounded flex flex-col md:w-[300px] pt-8 md:pt-4">
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
