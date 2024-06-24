import fs = require('fs');
import path = require('path');
import jsdom = require('jsdom');
import arg = require('arg');
const { JSDOM } = jsdom;

const args = arg({
  '--list': Boolean,
  '--json': Boolean,
});

const dom = new JSDOM('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" style="display:none;"></svg>');
const document = dom.window.document;
const symbols = dom.window.document.querySelector('svg') as SVGSVGElement;
const iconsDir = path.resolve(__dirname, 'svg');
const distDir = path.resolve(__dirname, '../src');
const rootDir = path.resolve(__dirname);
const iconFilenames = fs.readdirSync(iconsDir);
const statics = getStatics();

if (args['--list']) {
  list();
} else {
  appendSVGFiles();
  extract();
}

function list(): void {
  if (args['--json']) process.stdout.write(JSON.stringify(iconFilenames.map(filename => filename.replace(/\.svg/g, '')), null, 2));
  else process.stdout.write(iconFilenames.join('\n').replace(/\.svg/g, ''));
}

function extract(): void {
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);
  const content = document.body.innerHTML.replace(/viewbox/g,'viewBox');
  fs.writeFileSync(path.join(distDir,'symbols.svg'), content);
  // fs.writeFileSync(path.join(distDir,'symbols.json'), JSON.stringify({ content }));
}

function getStatics(): string[] {
  return JSON.parse(fs.readFileSync(path.join(rootDir,'statics.json'), { encoding: 'utf8' }));
}

function appendSVGFiles(): void {
  iconFilenames.forEach(filename => {
    const fileContent = fs.readFileSync(path.join(iconsDir,filename),{ encoding: 'utf8' });
    let element = createElementFromHTML(fileContent.trim());
    if (!statics.includes(filename.slice(0,-4))) {
      removeSVGAttributes(element);
      mergeSVGPaths(element);
      removeGroups(element);
      setPathAttributes(element);
    }
    setId(element, filename.slice(0,-4));
    symbols.appendChild(element);
  });
}

function removeGroups(element: HTMLElement): void {
  element.querySelectorAll('g').forEach(el => el.parentElement?.removeChild(el));
}

function mergeSVGPaths(element: HTMLElement): void {
  const pathValues: string[] = [];
  const path = document.createElement('path');
  const paths = Array.from(element.getElementsByTagName('path'));
  paths.forEach(path => {
    pathValues.push(path.getAttribute('d') as string);
    path.parentElement?.removeChild(path);
  });
  path.setAttribute('d',pathValues.join(' '));
  if (paths) element.appendChild(path);
}

function setId(element: HTMLElement, identifier: string): void {
  element.cloneNode(); // No mutability
  element.id = `icon-${identifier}`;
}

function setPathAttributes(element: HTMLElement): void {
  const path = element.querySelector('path') as SVGPathElement;
  if (path) path.setAttribute('fill','var(--icon-color, currentColor)');
}

function removeSVGAttributes(element: HTMLElement): void {
  element.cloneNode(); // No mutability
  element.removeAttribute('style');
  // element.removeAttribute('viewBox');
  element.removeAttribute('fill');
  element.removeAttribute('stroke');
}

function createElementFromHTML(html: string): HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = html;
  const svg = container.querySelector('svg') as SVGSVGElement;
  const viewBox = svg.getAttribute('viewBox');
  const symbol = document.createElement('symbol');
  if (viewBox) symbol.setAttribute('viewBox', viewBox);
  symbol.innerHTML = svg.innerHTML;
  return symbol as HTMLElement;
}
