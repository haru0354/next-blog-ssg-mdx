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
};

const SideMenu: React.FC<SideMenuProps> = ({ firstLevelArticle_slug }) => {
  const hasBorder = process.env.SIDE_MENU_BORDER === "true";

  return (
    <div
      className={`w-full rounded flex flex-col md:w-[300px] ${
        hasBorder ? "pt-8 md:pt-4" : "p-2 md:pt-4 bg-white"
      }`}
    >
      <SideImageTop />
      <SideRecommendArticles border={hasBorder} />
      {firstLevelArticle_slug && (
        <SideChildCategory
          firstLevelArticle_slug={firstLevelArticle_slug}
          border={true}
        />
      )}
      <SideCategory border={hasBorder} />
      <SideNewArticle border={hasBorder} />
      <SideLinks border={hasBorder} />
      <SideSearchBar border={hasBorder} />
      <SideImageBottom />
    </div>
  );
};

export default SideMenu;
