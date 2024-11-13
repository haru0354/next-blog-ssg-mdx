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
      <div className="w-full rounded flex flex-col md:w-[300px] p-2 md:pt-4 bg-white">
        <SideImageTop />
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
        <SideImageTop />
        <SideRecommendArticles border={true} />
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
        <SideImageBottom/>
        <SideSearchBar border={true}/>
      </div>
    </>
  );
};

export default SideMenu;
