import SideLinks from "./parts/SideLinks";
import SideRecommendArticles from "./parts/SideRecommendArticles";
import SideImageBottom from "./parts/SideImageBottom";
import SideChildCategory from "./parts/SideChildCategory";
import SideSearchBar from "./parts/SideSearchBar";
import SideCategory from "./parts/SideCategory";
import SideNewArticle from "./parts/SideNewArticle";
import SideImageTop from "./parts/SideImageTop";

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
      {process.env.SIDE_MENU_BORDER === "true" ? (
        <div className="w-full rounded flex flex-col md:w-[300px] pt-8 md:pt-4">
          <SideImageTop />
          <SideRecommendArticles border={true} />
          {firstLevelArticle_slug && (
            <SideChildCategory
              firstLevelArticle_slug={firstLevelArticle_slug}
              border={true}
            />
          )}
          <SideCategory border={true} />
          <SideNewArticle border={true} />
          <SideLinks border={true} />
          <SideSearchBar border={true} />
          <SideImageBottom />
        </div>
      ) : (
        <div className="w-full rounded flex flex-col md:w-[300px] p-2 md:pt-4 bg-white">
          <SideImageTop />
          <SideRecommendArticles />
          {firstLevelArticle_slug && (
            <SideChildCategory
              firstLevelArticle_slug={firstLevelArticle_slug}
            />
          )}
          <SideCategory />
          <SideNewArticle />
          <SideLinks />
          <SideSearchBar />
          <SideImageBottom />
        </div>
      )}
    </>
  );
};

export default SideMenu;
