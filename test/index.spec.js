import Parser from '../src/Parser';

// tests...
Parser.parseLine('el.tag1.tag2(prop.some.x=40, y=10)#id | TEST');
Parser.parseLine('el.tag1#id | TEST');
