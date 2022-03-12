// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "base64-sol/base64.sol";

contract NFT is ERC721URIStorage, Pausable, AccessControl {
  using Counters for Counters.Counter;

  event mintNFT(uint256 indexed tokenId, string tokenURI);

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant USER_ROLE = keccak256("USER_ROLE");

  Counters.Counter private _tokenIdCounter;

  constructor() ERC721("BitOfTechNFT", "BNFT") {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER_ROLE, msg.sender);
    _grantRole(USER_ROLE, msg.sender);
  }

  function safeMint(address to)
    public
    // string memory svg
    // string memory cid,
    // string memory metadata,
    // string memory nftRole
    onlyRole(MINTER_ROLE)
  {
    uint256 tokenId = _tokenIdCounter.current();

    // parse metatdata for role
    string memory nftRole = "USER_ROLE";

    string memory svg = string(
      abi.encodePacked(
        "<svg height="
        ",100,"
        " width="
        ",100,"
        "> <circle cx="
        ",50,"
        " cy="
        ",50,"
        " r="
        ",40,"
        " stroke="
        ",black,"
        " stroke-width="
        ",3,"
        " fill="
        ",red,"
        " />Sorry, your browser does not support inline SVG.</svg>"
      )
    );

    _safeMint(to, tokenId);
    string memory imageURI = svgToImgURI(svg);
    string memory tokenURI = formatTokenURI(imageURI, nftRole);
    _setTokenURI(tokenId, tokenURI);
    emit mintNFT(tokenId, tokenURI);
    _tokenIdCounter.increment();
  }

  function svgToImgURI(string memory svg) public pure returns (string memory) {
    string memory baseURL = "data:image/svg+xml;base64,";
    string memory svgEncoded = Base64.encode(
      bytes(string(abi.encodePacked(svg)))
    );
    string memory imageURI = string(abi.encodePacked(baseURL, svgEncoded));
    return imageURI;
  }

  function formatTokenURI(string memory imageURI, string memory nftRole)
    public
    pure
    returns (string memory)
  {
    string memory baseURL = "data:application/json;base64";
    return
      string(
        abi.encodePacked(
          baseURL,
          Base64.encode(
            bytes(
              abi.encodePacked(
                '{"name": "IAM Role NFT"',
                '"description":  "',
                nftRole,
                ' role"',
                '"attributes": {',
                '"trait_type": "Role"',
                '"value": "',
                nftRole,
                '"}',
                '"image": "',
                imageURI,
                '"}'
              )
            )
          )
        )
      );
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override whenNotPaused {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  // The following functions are overrides required by Solidity.

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
