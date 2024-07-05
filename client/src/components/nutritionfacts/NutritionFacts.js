"use client";
import { useEffect, useState } from "react";
import { Button, List, Skeleton } from "antd";
import { FireFilled, CaretDownFilled } from "@ant-design/icons";
import Link from "next/link";

const data = [
  {
    id: 1,
    name: { title: "Calories", number: "315" },
    icon: <img src="/icons/cal.png" alt="calories" />,
  },
  {
    id: 2,
    name: { title: "Fat", number: "24g" },
    icon: <img src="/icons/fat.png" alt="calories" />,
  },
  {
    id: 3,
    name: { title: "Carbs", number: "30g" },
    icon: <img src="/icons/carbs.png" alt="calories" />,
  },
  {
    id: 4,
    name: { title: "Protein", number: "10g" },
    icon: <img src="/icons/protein.png" alt="calories" />,
  },
  {
    id: 5,
    name: { title: "Total fat", number: "23g (29%)" },
  },
  {
    id: 6,
    name: { title: "Saturated Fat", number: "23g (29%)" },
  },
];

const NutritionFacts = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setInitLoading(false);
    setList(data.slice(0, 3));
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      if (showAll) {
        setList(data.slice(0, 3).map((item) => ({ ...item, loading: false })));
      } else {
        setList(data.map((item) => ({ ...item, loading: false })));
      }
      setLoading(false);
      setShowAll(!showAll);
      window.dispatchEvent(new Event("resize"));
    }, 1000);
  };

  const buttonText = showAll
    ? "Hide Full Nutrition Label"
    : "Show Full Nutrition Label";

  const loadMore = !initLoading ? (
    <div className="mt-3 h-7">
      <a
        className="text-base show-more-btn text-[#0F0F0F] hover:text-[#288B22]"
        onClick={onLoadMore}
      >
        {buttonText}
      </a>
    </div>
  ) : null;

  return (
    <div className="p-5 block lg:hidden mt-4 bg-white rounded-xl border-separate border-spacing-2 border border-[#DEDEDE] border-solid">
      <div className="mb-2">
        <p className="text-xl font-semibold text-gray-900">
          Nutrition Facts
          <span className="text-base font-normal text-secondary">
            (per serving)
          </span>
        </p>
      </div>
      <List
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Skeleton
              loading={loading || item.loading}
              active
              shape="square"
              size="small"
              paragraph={{ rows: 1 }}
            >
              <div className="flex items-center">
                {item.icon && <div className="pr-4">{item.icon}</div>}
                <div className="text-base">{`${item.name?.title} `}</div>
              </div>
              <div className="text-base">{`${item.name?.number} `}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default NutritionFacts;
