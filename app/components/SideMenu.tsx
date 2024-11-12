import SideLinks from "./side-menu/SideLinks";
import SideRecommendArticles from "./side-menu/SideRecommendArticles";
import SideImage from "./side-menu/SideImage";
import SideImageBottom from "./side-menu/SideImageBottom";
import SideChildCategory from "./side-menu/SideChildCategory";
import SideSearchBar from "./side-menu/SideSearchBar";
import SideCategory from "./side-menu/SideCategory";
import SideNewArticle from "./side-menu/SideNewArticle";

type SideMenuProps = {
  firstLevelArticle_slug?: string;
  categoryName?: string;
};

const SideMenu: React.FC<SideMenuProps> = ({
  firstLevelArticle_slug,
  categoryName,
}) => {
  return (
    <>
      <div className="w-full rounded flex flex-col md:w-[300px] p-2 md:pt-4 bg-white">
        <SideImage />
        <SideRecommendArticles />
        {firstLevelArticle_slug && (
          <SideChildCategory
            firstLevelArticle_slug={firstLevelArticle_slug}
            categoryName={categoryName}
          />
        )}
        <SideCategory />
        <SideNewArticle />
        <SideLinks />
        <SideImageBottom />
        <SideSearchBar />
      </div>
      <div className="w-full rounded flex flex-col md:w-[300px] pt-8 md:pt-4">
        <SideImage />
        <SideRecommendArticles />
        {firstLevelArticle_slug && (
          <SideChildCategory
            firstLevelArticle_slug={firstLevelArticle_slug}
            categoryName={categoryName}
            border={true}
          />
        )}
        <SideCategory border={true} />
        <SideNewArticle border={true} />
        <SideLinks border={true} />
        <SideImageBottom />
        <SideSearchBar />
      </div>
    </>
  );
};

export default SideMenu;
