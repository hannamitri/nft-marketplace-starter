import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { fetchAuthor, fetchItemDetails } from "../services/marketplace";
import { ItemDetailsSkeleton } from "../components/UI/LoadingSkeletons";

const getPerson = (item, role) => {
  const personValue = item[role];
  const person =
    personValue && typeof personValue === "object" ? personValue : {};
  const id =
    person.id ??
    person.authorId ??
    person.userId ??
    item[`${role}Id`] ??
    (role === "author" ? item.authorId : undefined);
  const name =
    (typeof personValue === "string" ? personValue : undefined) ??
    person.name ??
    person.authorName ??
    person.displayName ??
    item[`${role}Name`] ??
    (role === "author" ? item.authorName : undefined);
  const image =
    person.image ??
    person.authorImage ??
    person.profileImage ??
    person.avatar ??
    item[`${role}Image`] ??
    (role === "author" ? item.authorImage : undefined);

  if (id == null && name == null && image == null) {
    return null;
  }

  return { id, name, image };
};

const resolvePeople = async (item) => {
  let creator = getPerson(item, "creator") || getPerson(item, "author") || {};
  let owner = getPerson(item, "owner") || creator;

  if (
    creator.id != null &&
    owner.id != null &&
    String(creator.id) === String(owner.id)
  ) {
    creator = {
      ...creator,
      name: creator.name || owner.name,
      image: creator.image || owner.image,
    };
    owner = {
      ...owner,
      name: owner.name || creator.name,
      image: owner.image || creator.image,
    };
  }

  const authorIds = [
    ...new Set(
      [creator, owner]
        .filter((person) => person.id != null && !person.name)
        .map((person) => String(person.id))
    ),
  ];
  const authorProfiles = await Promise.all(
    authorIds.map(async (id) => [id, await fetchAuthor(id)])
  );
  const profilesById = new Map(
    authorProfiles
      .filter(([, profile]) => profile)
      .map(([id, profile]) => [id, profile])
  );

  const resolvePerson = (person, role) => {
    const profile =
      person.id == null ? null : profilesById.get(String(person.id));
    const name = person.name || (profile && profile.authorName);

    return {
      id: person.id ?? (profile && profile.authorId),
      name: name || (role === "owner" ? "Owner" : "Creator"),
      image: person.image || (profile && profile.authorImage) || AuthorImage,
      nameUnavailable: !name,
    };
  };

  return {
    owner: resolvePerson(owner, "owner"),
    creator: resolvePerson(creator, "creator"),
  };
};

const PersonDetails = ({ label, person }) => {
  const authorUrl = person.id == null ? "/author" : `/author/${person.id}`;

  return (
    <>
      <h6>{label}</h6>
      <div className="item_author">
        <div className="author_list_pp">
          <Link to={authorUrl}>
            <img className="lazy" src={person.image} alt={person.name} />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        <div className="author_list_info">
          <Link to={authorUrl}>{person.name}</Link>
        </div>
      </div>
    </>
  );
};

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [people, setPeople] = useState(null);
  const [loading, setLoading] = useState(Boolean(nftId));
  const [error, setError] = useState("");
  const [profileWarning, setProfileWarning] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!nftId) {
      setLoading(false);
      setError("");
      setItem(null);
      setPeople(null);
      setProfileWarning("");
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError("");
    setItem(null);
    setPeople(null);
    setProfileWarning("");

    fetchItemDetails(nftId)
      .then(async (matchingItem) => {
        const resolvedPeople = await resolvePeople(matchingItem);
        if (isMounted) {
          setItem(matchingItem);
          setPeople(resolvedPeople);
          setProfileWarning(
            resolvedPeople.owner.nameUnavailable ||
              resolvedPeople.creator.nameUnavailable
              ? "A user name could not be found for this item."
              : ""
          );
          setError("");
          setLoading(false);
        }
      })
      .catch((fetchError) => {
        console.error("Error fetching item details:", fetchError.message);
        if (isMounted) {
          setError("Unable to load this item.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [nftId]);

  if (loading) {
    return <ItemDetailsSkeleton />;
  }

  if (error) {
    return (
      <div id="wrapper">
        <div className="container" role="alert">
          {error}
        </div>
      </div>
    );
  }

  const title = item ? item.title : "Rainbow Style #194";
  const image = item ? item.nftImage : nftImage;
  const description = item
    ? item.description
    : "doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";
  const creator = people
    ? people.creator
    : { name: "Monica Lucas", image: AuthorImage };
  const owner = people ? people.owner : creator;
  const likes = item ? item.likes : 74;
  const views = item ? item.views : 100;
  const price = item ? item.price : 1.85;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={image}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{title}</h2>
                  {profileWarning && <p role="alert">{profileWarning}</p>}

                  <div className="item_info_counts">
                    {views != null && (
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {views}
                      </div>
                    )}
                    {likes != null && (
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {likes}
                      </div>
                    )}
                  </div>
                  {description && <p>{description}</p>}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <PersonDetails label="Owner" person={owner} />
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <PersonDetails label="Creator" person={creator} />
                    </div>
                    <div className="spacer-40"></div>
                    {price != null && (
                      <>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{price}</span>
                        </div>
                      </>
                    )}
                    {item && item.code != null && (
                      <p>Collection code: ERC-{item.code}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
