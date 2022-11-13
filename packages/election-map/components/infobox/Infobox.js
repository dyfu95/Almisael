import styled from 'styled-components'

const InfoboxWrapper = styled.div`
  font-family: 'Noto Sans TC', sans-serif;
  padding: 16px 22px;
  font-size: 18px;
  height: 130px;
  overflow: auto;
`

const InfoboxScrollWrapper = styled.div``

const PresidentTitle = styled.p`
  margin: 0 0 20px;
  font-weight: 700;
`

const PresidentCandidate = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  font-weight: 700;
  line-height: 26px;
  ${({ elected }) => elected && 'color: green;'}
`

const InfoboxText = styled.p`
  margin: 0;
`

const ElectedIcon = styled.div`
  margin-left: 14px;
  display: flex;
  justify-contnet: center;
  align-items: center;
`

const electedSvg = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.364 3.63604L17.0711 2.92893L16.364 3.63604C17.1997 4.47177 17.8626 5.46392 18.3149 6.55585C18.7672 7.64778 19 8.8181 19 10C19 11.1819 18.7672 12.3522 18.3149 13.4441C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364L2.92893 17.0711L3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68509 13.4441C1.23279 12.3522 1 11.1819 1 10C1 8.8181 1.23279 7.64778 1.68509 6.55585C2.13738 5.46392 2.80031 4.47177 3.63604 3.63604C4.47177 2.80031 5.46392 2.13738 6.55585 1.68508C7.64778 1.23279 8.8181 1 10 1C11.1819 1 12.3522 1.23279 13.4442 1.68508C14.5361 2.13738 15.5282 2.80031 16.364 3.63604Z"
      stroke="#DB4C65"
      strokeWidth="2"
    />
    <line x1="10" y1="1" x2="10" y2="19" stroke="#DB4C65" strokeWidth="2" />
    <line
      x1="10.3638"
      y1="9.83658"
      x2="3.04776"
      y2="14.6275"
      stroke="#DB4C65"
      strokeWidth="2"
    />
  </svg>
)

const PresidentInfobox = ({ level, data }) => {
  const { profRate, candidates } = data
  return (
    <InfoboxScrollWrapper>
      <PresidentTitle>
        {level === 0 && '總'}投票率 {profRate}%
      </PresidentTitle>
      {candidates.map((candidate) => {
        const elected = candidate.candVictor === '*'
        return (
          <PresidentCandidate elected={elected} key={candidate.candNo}>
            {candidate.name} {candidate.party} {candidate.tksRate}%
            {elected && <ElectedIcon>{electedSvg}</ElectedIcon>}
          </PresidentCandidate>
        )
      })}
    </InfoboxScrollWrapper>
  )
}

const MayorTitle = styled.p`
  margin: 0 0 20px;
  font-weight: 700;
`

const MayorCandidate = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  font-weight: 700;
  line-height: 26px;
  ${({ elected }) => elected && 'color: green;'}
`

const MayorInfobox = ({ level, data }) => {
  if (typeof data === 'string') {
    return (
      <InfoboxScrollWrapper>
        <InfoboxText>{data}</InfoboxText>
      </InfoboxScrollWrapper>
    )
  }

  const { profRate, candidates } = data

  return (
    <InfoboxScrollWrapper>
      <MayorTitle>
        {level === 1 && '總'}投票率 {profRate}%
      </MayorTitle>
      {candidates
        .sort((cand1, cand2) => {
          if (cand1.tksRate === cand2.tksRate) {
            return 0
          }
          return cand1.tksRate < cand2.tksRate ? 1 : -1
        })
        .map((candidate) => {
          const elected = candidate.candVictor === '*'
          return (
            <MayorCandidate elected={elected} key={candidate.candNo}>
              {candidate.name} {candidate.party} {candidate.tksRate}%
              {elected && <ElectedIcon>{electedSvg} </ElectedIcon>}
            </MayorCandidate>
          )
        })}
    </InfoboxScrollWrapper>
  )
}

const LegislatorDistrict = styled.div`
  padding: 20px 0;
  border-top: 1px solid #000;
  &:nth-of-type(2) {
    border-top: unset;
    padding-top: unset;
  }
  &:last-of-type {
    padding-bottom: unset;
  }
`
const LegislatorConstituency = styled.div`
  font-size: 17px;
  color: gray;
`

const LegislatorTitle = styled.div`
  margin-bottom: 20px;
  font-weight: 700;
`

const LegislatorCandidate = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  line-height: 26px;
  ${({ elected }) => elected && 'color: green;'}
`

const LegislatorInfobox = ({ level, data }) => {
  if (level === 0) {
    return (
      <InfoboxScrollWrapper>
        <InfoboxText>點擊地圖看更多資料</InfoboxText>
      </InfoboxScrollWrapper>
    )
  }
  if (level === 1) {
    const { summary, districts } = data
    const { profRate } = summary

    return (
      <InfoboxScrollWrapper>
        <LegislatorTitle>投票率 {profRate}%</LegislatorTitle>
        {districts.map(({ county, area, range, candidates }) => {
          const legislatorIdPrefix = county + area
          const constituency = range.split(' ')[1]
          const candidateComps = candidates.map((candidate) => {
            const elected = candidate.candVictor === '*'
            return (
              <LegislatorCandidate
                elected={elected}
                key={legislatorIdPrefix + candidate.candNo}
              >
                {candidate.name} {candidate.party} {candidate.tksRate}%
                {elected && <ElectedIcon>{electedSvg} </ElectedIcon>}
              </LegislatorCandidate>
            )
          })
          return (
            <LegislatorDistrict key={legislatorIdPrefix}>
              <LegislatorConstituency>{constituency}</LegislatorConstituency>
              {candidateComps}
            </LegislatorDistrict>
          )
        })}
      </InfoboxScrollWrapper>
    )
  }

  const { profRate, candidates, county, area } = data
  const legislatorIdPrefix = county + area

  return (
    <InfoboxScrollWrapper>
      <LegislatorTitle>投票率 {profRate}%</LegislatorTitle>
      {candidates.map((candidate) => {
        const elected = candidate.candVictor === '*'
        return (
          <LegislatorCandidate
            elected={elected}
            key={legislatorIdPrefix + candidate.candNo}
          >
            {candidate.name} {candidate.party} {candidate.tksRate}%
            {elected && <ElectedIcon>{electedSvg} </ElectedIcon>}
          </LegislatorCandidate>
        )
      })}
    </InfoboxScrollWrapper>
  )
}

const CouncilMemberDistrict = styled.div`
  padding: 20px 0;
  border-top: 1px solid #000;
  &:first-of-type {
    border-top: unset;
    padding-top: unset;
  }
  &:last-of-type {
    padding-bottom: unset;
  }
`
const CouncilMemberConstituency = styled.div`
  font-size: 17px;
  color: gray;
`

const CouncilMemberTitle = styled.div`
  margin-bottom: 20px;
  font-weight: 700;
`

const CouncilMemberCandidate = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  line-height: 26px;
  ${({ elected }) => elected && 'color: green;'}
`

const CouncilMemberInfobox = ({ level, data }) => {
  if (typeof data === 'string') {
    return (
      <InfoboxScrollWrapper>
        <InfoboxText>{data}</InfoboxText>
      </InfoboxScrollWrapper>
    )
  }

  if (level === 1) {
    const { districts } = data
    console.log('districts', data)
    return (
      <InfoboxScrollWrapper>
        {districts.map(({ county, area, range, candidates, profRate }) => {
          const councilMemberdPrefix = county + area
          const constituency = range.split(' ')[1]
          const candidateComps = candidates.map((candidate) => {
            const elected = candidate.candVictor === '*'
            return (
              <CouncilMemberCandidate
                elected={elected}
                key={councilMemberdPrefix + candidate.candNo}
              >
                {candidate.name} {candidate.party} {candidate.tksRate}%
                {elected && <ElectedIcon>{electedSvg} </ElectedIcon>}
              </CouncilMemberCandidate>
            )
          })
          return (
            <CouncilMemberDistrict key={councilMemberdPrefix}>
              <CouncilMemberConstituency>
                {constituency}
              </CouncilMemberConstituency>
              <CouncilMemberTitle>投票率 {profRate}%</CouncilMemberTitle>
              {candidateComps}
            </CouncilMemberDistrict>
          )
        })}
      </InfoboxScrollWrapper>
    )
  }

  const { profRate, candidates, county, area } = data
  const councilMemberdPrefix = county + area

  return (
    <InfoboxScrollWrapper>
      <CouncilMemberTitle>投票率 {profRate}%</CouncilMemberTitle>
      {candidates.map((candidate) => {
        const elected = candidate.candVictor === '*'
        return (
          <CouncilMemberCandidate
            elected={elected}
            key={councilMemberdPrefix + candidate.candNo}
          >
            {candidate.name} {candidate.party} {candidate.tksRate}%
            {elected && <ElectedIcon>{electedSvg} </ElectedIcon>}
          </CouncilMemberCandidate>
        )
      })}
    </InfoboxScrollWrapper>
  )
}

const ReferendumTitle = styled.p`
  margin: 0 0 20px;
  font-weight: 700;
`

const ReferendumPassWrapper = styled.span`
  color: #ff8585;
`

const ReferendumCandidate = styled.div``

const ReferendumInfobox = ({ data }) => {
  if (typeof data === 'string') {
    return (
      <InfoboxScrollWrapper>
        <InfoboxText>{data}</InfoboxText>
      </InfoboxScrollWrapper>
    )
  }

  const { profRate, adptVictor, agreeRate, disagreeRate } = data
  const noResult = adptVictor !== 'Y' && adptVictor !== 'N'
  const pass = adptVictor === 'Y'
  return (
    <InfoboxScrollWrapper>
      <ReferendumTitle>
        此案是否通過{' '}
        {pass ? <ReferendumPassWrapper>是</ReferendumPassWrapper> : '否'}
        <br />
        投票率 {profRate}%
      </ReferendumTitle>
      {noResult ? (
        <>
          <ReferendumCandidate>同意 {agreeRate}%</ReferendumCandidate>
          <ReferendumCandidate>不同意 {disagreeRate}%</ReferendumCandidate>
        </>
      ) : pass ? (
        <>
          <ReferendumCandidate>
            <ReferendumPassWrapper>同意 {agreeRate}%</ReferendumPassWrapper>
          </ReferendumCandidate>
          <ReferendumCandidate>不同意 {disagreeRate}%</ReferendumCandidate>
        </>
      ) : (
        <>
          <ReferendumCandidate>同意 {agreeRate}%</ReferendumCandidate>
          <ReferendumCandidate>
            <ReferendumPassWrapper>
              不同意 {disagreeRate}%
            </ReferendumPassWrapper>
          </ReferendumCandidate>
        </>
      )}
    </InfoboxScrollWrapper>
  )
}

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} InfoboxTemplateInput
 * @property {string} type - Election types, like president
 * @property {number} level - Info level: 1. country, 2. county, 3. towns / constituency 4. village
 * @property {number} profRate - Total vote rate
 * @property {object[]} candidates - All candidates info
 */

/**
 * Create infobox template based on the election infos
 * @param {InfoboxTemplateInput} input
 * @return {string} template
 */

// const templates = {
//   president: `
//   投票率 ${profRate}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   `,
//   mayor: `
//   總投票率 ${profRate}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   `,
//   councilMember: `
//   ${constituency}
//   投票率 ${profRate}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   `,
//   legislator: `
//   ${constituency}
//   投票率 ${profRate}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   `,
// }

const referendumInfoboxData = (data, level) => {
  if (!data) {
    console.log(`no data for mayor infobox in level ${level}`, data)
    return '無資料'
  }

  if (!data.profRate && level === 3) {
    console.log(`no profRate for running mayor infobox in level ${level}`, data)
    return '目前即時開票無村里資料'
  }

  if (!data.profRate) {
    console.error(`data error for mayor infoboxData in level ${level}`, data)
    return '資料錯誤，請確認'
  }

  return data
}

const mayorInfoboxData = (data, level) => {
  if (level === 0) {
    return '點擊地圖看更多資料'
  }

  if (!data) {
    console.log(`no data for mayor infobox in level ${level}`, data)
    return '無資料'
  }

  if (data === '10020') {
    return '嘉義市長選舉改期至2022/12/18'
  }

  if (!data.profRate && level === 3) {
    console.log(`no profRate for running mayor infobox in level ${level}`, data)
    return '目前即時開票無村里資料'
  }

  if (!data.profRate) {
    console.error(`data error for mayor infoboxData in level ${level}`, data)
    return '資料錯誤，請確認'
  }

  return data
}

const councilMemberInfoboxData = (data, level) => {
  if (level === 0) {
    return '點擊地圖看更多資料'
  }

  if (!data) {
    console.log(`no data for councilMember infobox in level ${level}`, data)
    return '無資料'
  }
  if (!data.profRate && level === 3) {
    console.log(
      `no profRate for running councilMember infobox in level ${level}`,
      data
    )
    return '目前即時開票無村里資料'
  }

  if (!data.profRate) {
    console.error(
      `data error for councilMember infoboxData in level ${level}`,
      data
    )
    return '資料錯誤，請確認'
  }

  return data
}

export const Infobox = ({ data }) => {
  const { electionType, level, electionData } = data
  let infobox
  switch (electionType) {
    case 'president': {
      infobox = <PresidentInfobox level={level} data={electionData} />
      break
    }
    case 'mayor': {
      const data = mayorInfoboxData(electionData, level)
      infobox = <MayorInfobox level={level} data={data} />
      break
    }
    case 'legislator': {
      infobox = <LegislatorInfobox level={level} data={electionData} />
      break
    }
    case 'councilMember': {
      const data = councilMemberInfoboxData(electionData, level)
      infobox = <CouncilMemberInfobox level={level} data={data} />
      break
    }
    case 'referendum':
      const data = referendumInfoboxData(electionData, level)
      infobox = <ReferendumInfobox data={data} />
      break
    default:
      break
  }

  return <InfoboxWrapper>{infobox}</InfoboxWrapper>
}

/*
總統
投票率 ${profRate}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}

縣市首長
總投票率 ${profRate}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}

立法委員
下面可能是array
${選區名稱}
投票率 ${profRate}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
or
點擊地圖看更多資訊

縣市議員
下面可能是array
${選區名稱}
投票率 ${profRate}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
or
點擊地圖看更多資訊

公投
${公投案號} ${公投案簡稱}
此案是否通過：${通過與否}
投票率 ${profRate}
同意 ${agreeRate}
不同意 ${全國投票率得票率}


*/

/**
 * President level: 1. country, 2. county, 3. towns 4. village
 * Mayor level: 1. county, 2. towns 3. village
 * Councilmen level: 1. county, 2. constituency 3. village
 * Indigenous Councilmen level: 1. county, 2. constituency 3. village
 * Legislators level: 1. county 2. constituency 3. village
 * Indigenous Legislators level: 1. country, 2. county, 3. towns 4. village
 * Legislators Party level: 1. country, 2. county, 3. towns 4. village
 * Referendum level: 1. country, 2. county, 3. towns 4. village
 */
