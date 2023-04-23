import { useState } from "react";
import styles from "./SearchBar.module.scss";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [input, setInput] = useState<string>("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  // @TODO - fix this type
  const handleSubmit = (e: any) => {
    e.preventDefault();
    !!input.length && router.push("/search?q=" + input);
  };

  return (
    <div className={styles["container"]}>
      <form className={styles["search-form"]} onSubmit={(e) => handleSubmit(e)}>
        <BsSearch className={styles["search-icon"]} style={{ color: "#000" }} />
        <input
          value={input}
          type="text"
          placeholder="Search"
          className={`${styles["search-input"]} ${
            focused && styles["search-input-extended"]
          }`}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocused(true)}
          // @TODO - fix this blur
          onBlur={() => setFocused(false)}
        />
        {!!input.length && (
          <AiOutlineClose
            className={styles["search-close-icon"]}
            onClick={(e) => {
              setInput("");
            }}
          />
        )}
      </form>
    </div>
  );
};

export default SearchBar;
