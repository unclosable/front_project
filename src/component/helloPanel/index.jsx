import MainPanel from '../main.panel.jsx'

class HelloPanel extends React.Component {
  render() {
    return <MainPanel disBackHome>
      <div className='middleDiv'>
        <span className="helloFront">This is your life</span>
        <span className="helloFront">and it’s ending one minute at a time</span>
      </div>
    </MainPanel>;
  }
}
export default HelloPanel;
