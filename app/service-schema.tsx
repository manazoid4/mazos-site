import { OFFERS } from './offers';
import { SITE_URL } from './site';
export function ServiceSchema({ path }: { path: string }) {
 const schema = { '@context':'https://schema.org', '@type':'Service', name:'Business systems and automation', provider:{'@id':`${SITE_URL}/#maz-works`}, areaServed:'United Kingdom', url:`${SITE_URL}${path}`, hasOfferCatalog:{'@type':'OfferCatalog',name:'Maz Works packages',itemListElement:OFFERS.map(offer=>({'@type':'Offer',name:offer.name,priceSpecification:{'@type':'PriceSpecification',minPrice:offer.from,priceCurrency:'GBP'},itemOffered:{'@type':'Service',name:offer.name}}))}};
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} />;
}
