import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

const page = () => {
  return (
    <div className="content p-4 bg-white">
      <h2 className="text-xl font-semibold text-white my-6 p-4 bg-main-gray rounded">
        プライバシーポリシー
      </h2>
      このプライバシーポリシーは、「
      <Link href="/" className="text-sky-600">
        当サイト
      </Link>
      」 の利用に関する情報収集、利用、および開示に関する方針を説明します。
      <h3 className="text-lg font-semibold my-6 p-2 border-b-2 border-gray-700">
        アクセス解析ツールについて
      </h3>
      <p className="mb-4">
        Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
      </p>
      <p className="mb-4">
        このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
      </p>
      <p className="mb-4">
        Googleアナリティクスに関する詳細情報は「
        <a
          href="https://marketingplatform.google.com/about/analytics/terms/jp/"
          target="blank"
        >
          Googleアナリティクス利用規約
        </a>
        」 をご覧ください。
      </p>
      <h3 className="text-lg font-semibold my-6 p-2 border-b-2 border-gray-700">
        広告について
      </h3>
      <p className="mb-4">
        第三者配信の広告サービス（Googleアドセンスなど）を利用しており、
        ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。
      </p>
      <p className="mb-4">お客様個人を特定できるものではありません。</p>
      <h2 className="text-xl font-semibold text-white my-6 p-4 bg-main-gray rounded">
        免責事項
      </h2>
      <h3 className="text-lg font-semibold my-6 p-2 border-b-2 border-gray-700">
        情報の正確性
      </h3>
      <p className="mb-4">
        掲載されている情報は、できる限り正確性を期していますが、その正確性や安全性に関して保証するものではありません。
      </p>
      <p className="mb-4">
        ユーザーがこれらの情報に依拠する際は、自己の判断と責任で行ってください。
        当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
      </p>
      <p className="mb-4">
        「情報は一般的な参考情報として提供されており、特定の状況に対する適切性や正確性を保証するものではありません。
      </p>
      <p className="mb-4">
        ユーザーは個別の状況に応じて専門家に相談することをお勧めします。
      </p>
      <h3 className="text-lg font-semibold my-6 p-2 border-b-2 border-gray-700">
        責任の制限
      </h3>
      <p>
        利用によって生じたいかなる損害に対しても、直接的な損害、間接的な損害、結果的な損害など、あらゆる種類の損害に対しても一切の責任を負いません。
      </p>
      <p className="mb-4">
        例えば、情報の誤りやサービスの停止による損害、第三者とのトラブルによる損害などが含まれます
      </p>
      <h3 className="text-lg font-semibold my-6 p-2 border-b-2 border-gray-700">
        外部リンク
      </h3>
      <p className="mb-4">
        第三者のウェブサイトへのリンクを提供する場合がありますが、
        これらのリンク先のコンテンツやプライバシーポリシーについては一切の管理や責任を負いません。
      </p>
      <p className="mb-4">
        「外部リンク先のコンテンツやサービスについての信頼性や安全性についての保証はいたしません。
        外部サイトやサービスを利用する際は、ユーザー自身の責任で行ってください。
      </p>
    </div>
  );
};

export default page;
