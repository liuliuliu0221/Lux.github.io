export type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  citation: string;
  url?: string;
  placeholder?: boolean;
};

export const publications: Publication[] = [
  {
    id: "PUB.001",
    title: "Effects of Winter Heating on Urban Black Carbon: Characteristics, Sources and Its Correlation with Meteorological Factors",
    authors: "Xinyu Liu, Yangbing Wei, Xinhui Liu, Lei Zu, Bowen Wang, Shenbo Wang, Ruiqin Zhang, Rencheng Zhu",
    venue: "Atmosphere 13(7), 1071",
    year: "2022",
    citation: "DOI: 10.3390/atmos13071071",
    url: "https://www.mdpi.com/2073-4433/13/7/1071",
  },
  {
    id: "PUB.002",
    title: "Nitric acid-enhanced iodine oxoacids nucleation",
    authors: "Xinyu Liu, Rongjie Zhang, Yangjie Zhang, Hong-Bin Xie",
    venue: "Atmospheric Environment 381, 122119",
    year: "2026",
    citation: "DOI: 10.1016/j.atmosenv.2026.122119",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1352231026003493",
  },
];
