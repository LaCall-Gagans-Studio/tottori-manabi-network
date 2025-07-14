import Header from '@/app/components/header'
import Footer from '@/app/components/footer'
import FAQ from '@/app/components/section.other/faq'

export default async function OtherPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const resolvedParams = await searchParams
  const section = resolvedParams.s || 'rule'

  return (
    <main>
      <Header />

      {section === 'faq' ? (
        <div
          id="faq"
          className="w-5/6 lg:w-1/2 mx-auto whitespace-pre-line leading-relaxed text-wrap py-24"
        >
          <FAQ />
        </div>
      ) : (
        <div
          id="policy"
          className="w-5/6 lg:w-1/2 mx-auto whitespace-pre-line leading-relaxed text-wrap py-24"
        >
          <h1 className="text-center text-xl lg:text-2xl mb-8">プライバシーポリシー</h1>
          <p>
            制定日：2025年6月27日
            <br />
            <br />
            「つなかん｜とっとりフリースクールネットワーク」（以下、「当サイト」といいます）は、個人情報の保護に関する法律（以下、「個人情報保護法」といいます）を遵守するとともに、以下のプライバシーポリシー（以下、「本ポリシー」といいます）に従い、適切な取扱い及び保護に努めます。
          </p>
          <p>
            <br />
            <span className="text-xl">第1条（個人情報の定義）</span>
            <br />
            本ポリシーにおいて、個人情報とは、個人情報保護法第2条第1項により定義された個人情報、すなわち、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含みます）を意味します。
          </p>
          <p>
            <br />
            <span className="text-xl">第2条（個人情報の取得方法）</span>
            <br />
            当サイトは、以下の場合に個人情報を取得いたします。
            <br />
            ・お問い合わせフォームからのご連絡時（氏名、メールアドレス、電話番号、お問い合わせ内容など）
            <br />
            ・イベント等へのお申し込み時（氏名、連絡先など、お申し込みに必要な情報）
          </p>
          <p>
            <br />
            <span className="text-xl">第3条（個人情報の利用目的）</span>
            <br />
            当サイトは、取得した個人情報を以下の目的で利用いたします。
            <br />
            ・お問い合わせ、ご相談への対応のため
            <br />
            ・お申し込みいただいたイベントやサービス等を提供するため
            <br />
            ・当サイトの活動に関するご案内や資料の送付のため
            <br />
            ・当サイトのサービス向上、改善、および新たなサービスの開発のため
            <br />
            ・上記の利用目的に付随する業務のため
          </p>
          <p>
            <br />
            <span className="text-xl">第4条（個人情報の第三者提供）</span>
            <br />
            当サイトは、次に掲げる場合を除き、あらかじめご本人の同意を得ることなく、第三者に個人情報を提供することはありません。
            <br />
            ・法令に基づく場合
            <br />
            ・人の生命、身体または財産の保護のために必要がある場合であって、ご本人の同意を得ることが困難であるとき
            <br />
            ・公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、ご本人の同意を得ることが困難であるとき
            <br />
            ・国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、ご本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
          </p>
          <p>
            <br />
            <span className="text-xl">第5条（個人情報の安全管理措置）</span>
            <br />
            当サイトは、取り扱う個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために、必要かつ適切な措置を講じます。
          </p>
          <p>
            <br />
            <span className="text-xl">第6条（個人情報の開示、訂正、利用停止等）</span>
            <br />
            当サイトは、ご本人から個人情報の開示、訂正、追加、削除、利用停止のご請求があった場合、ご本人であることを確認させていただいた上で、法令に従い速やかに対応いたします。ご請求の際は、第11条に定めるお問い合わせ窓口までご連絡ください。
          </p>
          <p>
            <br />
            <span className="text-xl">第7条（Cookie（クッキー）等の利用について）</span>
            <br />
            当サイトでは、サービスの利便性向上やサイトの利用状況分析のため、Cookieを使用することがあります。Cookieとは、ウェブサイトを閲覧した際に、ブラウザとサーバーとの間で送受信される小さなデータです。これには個人を特定する情報は含まれておりません。
            <br />
            ご利用のブラウザ設定により、Cookieの機能を無効にすることも可能です。ただし、その場合、当サイトの一部のサービスがご利用いただけなくなることがあります。
          </p>
          <p>
            <br />
            <span className="text-xl">第8条（アクセス解析ツールについて）</span>
            <br />
            当サイトは、サイトの利用状況を把握するために、Vercel AnalyticsおよびCloudflare Web
            Analyticsを利用しています。これらのツールはプライバシー保護を重視して設計されており、Cookieを使用せず、閲覧者を特定する個人情報を収集することはありません。
            <br />
            収集されるデータは、各社のプライバシーポリシーに基づいて管理されます。詳細については、以下をご確認ください。
            <br />
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ws-secondary"
            >
              ・Vercel Privacy Policy
            </a>
            <br />
            <a
              href="https://www.cloudflare.com/ja-jp/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ws-secondary"
            >
              ・Cloudflare Privacy Policy
            </a>
          </p>
          <p>
            <br />
            <span className="text-xl">第9条（免責事項）</span>
            <br />
            当サイトからリンクやバナーなどによって他のサイトに移動した場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。また、移動先サイトにおける個人情報の取扱いについても、当サイトは責任を負いかねますので、ご自身の判断と責任においてご利用ください。
          </p>
          <p>
            <br />
            <span className="text-xl">第10条（プライバシーポリシーの変更）</span>
            <br />
            当サイトは、法令の改正や運営方針の変更等に伴い、本ポリシーの内容を事前の予告なく変更することがあります。変更後のプライバシーポリシーは、当サイトに掲載したときから効力を生じるものとします。
          </p>
        </div>
      )}

      <Footer />
    </main>
  )
}
